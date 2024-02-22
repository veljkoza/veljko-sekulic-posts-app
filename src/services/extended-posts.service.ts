import { HttpClient } from "@/infrastructure";
import { ExtendedPost, Post } from "@/models";
import { IPostsService, IUsersService } from ".";

interface IExtendedPostsService {
  getAll: (urlParams?: { username?: string }) => Promise<{
    numberOfPrefetchedPosts: number;
    extendedPosts: ExtendedPost[];
  }>;
}

export const createExtendedPostsService = ({
  postsService,
  usersService,
}: {
  postsService: IPostsService;
  usersService: IUsersService;
  httpClient: HttpClient;
}): IExtendedPostsService => {
  const getAllWithPrefetchedComments = async (
    numberOfPostsToPrefetchComments: number,
    posts: Post[],
  ): Promise<ExtendedPost[]> => {
    const prefetch_comments_no = numberOfPostsToPrefetchComments;

    const postCommentsPromises = posts
      .slice(0, prefetch_comments_no)
      .map((post) => postsService.getCommentsByPostId(post.id));

    const commentsArray = await Promise.all(postCommentsPromises);

    const extendedPostsMap: Record<string, ExtendedPost> = {};
    commentsArray.forEach((comments) => {
      const firstComment = comments[0];
      const foundPost = posts.find((post) => post.id === firstComment.postId);
      if (foundPost) {
        extendedPostsMap[firstComment.postId] = {
          ...foundPost,
          comments,
        };
      }
    });

    const prefetchedExtendedPosts = Object.keys(extendedPostsMap).map(
      (key) => ({
        ...extendedPostsMap[key],
        comments: extendedPostsMap[key].comments,
      }),
    );

    const rest = posts
      .slice(prefetch_comments_no, posts.length)
      .map((post) => ({
        ...post,
        comments: [],
      }));

    const combined = [...prefetchedExtendedPosts, ...rest];

    return combined;
  };

  return {
    getAll: async (params) => {
      const urlParams: Partial<Post> = {};
      if (params?.username) {
        const usersWithThatUsername = await usersService.getAll({
          username: params.username,
        });
        const user = usersWithThatUsername[0];
        urlParams["userId"] = user.id;
      }
      const posts = await postsService.getAll(urlParams);
      const no_of_prefetched_posts = 5;

      const extendedPosts = await getAllWithPrefetchedComments(
        no_of_prefetched_posts,
        posts,
      );

      return {
        extendedPosts,
        numberOfPrefetchedPosts: no_of_prefetched_posts,
      };
    },
  };
};
