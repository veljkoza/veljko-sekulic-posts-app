export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
export type GetCommentByIdDTO = Comment;
export type GetCommentsByPostIdDTO = Comment[];
