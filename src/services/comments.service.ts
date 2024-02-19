import { Comment } from "@/models";

interface ICommentsService {
  getByPostId: (postId: string) => Comment;
}
