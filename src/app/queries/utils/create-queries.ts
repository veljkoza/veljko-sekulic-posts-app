import { httpClient as defaultHttpClient } from "@/infrastructure";
import { createServices } from "@/services";
import { createUseQuery } from ".";

export const createQueries = (httpClient = defaultHttpClient) => {
  const { posts, comments } = createServices(httpClient);
  const postsQueries = {
    getAll: { useQuery: createUseQuery(posts.getAll) },
    getById: { useQuery: createUseQuery(posts.getById) },
  };
  const commentsQueries = {
    getCommentsByPostId: {
      useQuery: createUseQuery(comments.getCommentsByPostId),
    },
    getById: { useQuery: createUseQuery(comments.getById) },
  };

  return { posts: postsQueries, comments: commentsQueries };
};
