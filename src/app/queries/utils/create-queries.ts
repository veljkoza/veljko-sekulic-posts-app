import { httpClient as defaultHttpClient } from "@/infrastructure";
import { createServices } from "@/services";
import { createUseQuery } from ".";
import { createUseInfiniteQuery } from "./create-use-infinite-query";

export const createQueries = (httpClient = defaultHttpClient) => {
  const { posts, comments, extendedPosts, users } = createServices(httpClient);
  const postsQueries = {
    getAll: { useQuery: createUseQuery(posts.getAll) },
    getById: { useQuery: createUseQuery(posts.getById) },
    getCommentsByPostId: {
      useQuery: createUseQuery(posts.getCommentsByPostId),
      useInfiniteQuery: createUseInfiniteQuery(posts.getCommentsByPostId),
    },
  };
  const commentsQueries = {
    getById: { useQuery: createUseQuery(comments.getById) },
  };
  const extendedPostQueries = {
    getAll: {
      useQuery: createUseQuery(extendedPosts.getAll),
    },
  };

  const usersQueries = {
    getById: {
      useQuery: createUseQuery(users.getById),
    },
  };

  return {
    posts: postsQueries,
    comments: commentsQueries,
    extendedPost: extendedPostQueries,
    users: usersQueries,
  };
};
