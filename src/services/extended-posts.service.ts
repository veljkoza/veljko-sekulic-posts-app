import { HttpClient } from "@/infrastructure";
import { Comment, Post } from "@/models";
import { IPostsService } from ".";
type ExtendedPost = Post & { comments: Comment[] };

interface IExtendedPostsService {
  getAll: () => Promise<ExtendedPost[]>;
}

export const createExtendedPostsService = ({
  postsService,
  // commentsService,
}: {
  postsService: IPostsService;
  // commentsService: ICommentsService;
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
      console.log({ firstComment, foundPost });
      if (foundPost) {
        extendedPostsMap[firstComment.postId] = {
          ...foundPost,
          comments: comments,
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
    getAll: async () => {
      const posts = await postsService.getAll();
      const prefetch_post_w_comments_no = 5;

      const extendedPosts = await getAllWithPrefetchedComments(
        prefetch_post_w_comments_no,
        posts,
      );

      return extendedPosts;
    },
  };
};
