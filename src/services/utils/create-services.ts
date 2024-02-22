import { httpClient as defaultHttpClient } from "@/infrastructure";
import { createCommentService, createPostsService } from "..";
import { createExtendedPostsService } from "../extended-posts.service";

export const createServices = (httpClient = defaultHttpClient) => {
  const postsService = createPostsService({ url: "/posts", http: httpClient });
  const commentsService = createCommentService({
    url: "/comments",
    http: httpClient,
  });
  const extendedPostsService = createExtendedPostsService({
    postsService,
    httpClient,
  });

  return {
    posts: postsService,
    comments: commentsService,
    extendedPostsService,
  };
};
