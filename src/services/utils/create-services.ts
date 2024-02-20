import { httpClient as defaultHttpClient } from "@/infrastructure";
import { createCommentService, createPostsService } from "..";

export const createServices = (httpClient = defaultHttpClient) => {
  const postsService = createPostsService("/posts", httpClient);
  const commentsService = createCommentService("/comments", httpClient);

  return { posts: postsService, comments: commentsService };
};
