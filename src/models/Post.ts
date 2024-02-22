export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type GetPostByIdDTO = Post;
export type GetAllPostsDTO = Post[];
