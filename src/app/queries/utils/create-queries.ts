import { httpClient as defaultHttpClient } from "@/infrastructure";
import { createServices } from "@/services";
import { createUseQuery } from ".";

export const createQueries = (httpClient = defaultHttpClient) => {
  const { posts, comments, extendedPostsService } = createServices(httpClient);
  const postsQueries = {
    getAll: { useQuery: createUseQuery(posts.getAll) },
    getById: { useQuery: createUseQuery(posts.getById) },
    getCommentsByPostId: {
      useQuery: createUseQuery(posts.getCommentsByPostId),
    },
  };
  const commentsQueries = {
    getById: { useQuery: createUseQuery(comments.getById) },
  };
  const extendedPostQueries = {
    getAll: {
      useQuery: createUseQuery(extendedPostsService.getAll),
    },
  };

  return {
    posts: postsQueries,
    comments: commentsQueries,
    extendedPost: extendedPostQueries,
  };
};
