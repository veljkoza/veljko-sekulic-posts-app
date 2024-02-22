import { Comment, Post } from ".";

export type ExtendedPost = Post & { comments: Comment[] };
