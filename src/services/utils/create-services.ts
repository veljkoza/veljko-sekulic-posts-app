import { httpClient as defaultHttpClient } from "@/infrastructure";
import {
  createCommentService,
  createPostsService,
  createUsersService,
} from "..";
import { createExtendedPostsService } from "../extended-posts.service";

export const createServices = (httpClient = defaultHttpClient) => {
  const postsService = createPostsService({ url: "/posts", http: httpClient });
  const commentsService = createCommentService({
    url: "/comments",
    http: httpClient,
  });

  const usersService = createUsersService({ url: "/users", http: httpClient });
  const extendedPostsService = createExtendedPostsService({
    postsService,
    usersService,
    httpClient,
  });

  return {
    posts: postsService,
    comments: commentsService,
    extendedPosts: extendedPostsService,
    users: usersService,
  };
};
