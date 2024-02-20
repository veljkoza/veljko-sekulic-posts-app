import { GetCommentByIdDTO, GetCommentsByPostIdDTO } from "@/models";
import { ServiceFn } from "./types";
import { httpClient } from "@/infrastructure";

export interface ICommentsService {
  getCommentsByPostId: (postId: string) => Promise<GetCommentsByPostIdDTO>;
  getById: (commentId: string) => Promise<GetCommentByIdDTO>;
}

export const createCommentService: ServiceFn<ICommentsService> = (
  urlPrefix,
  http = httpClient,
) => {
  const getCommentsByPostId: ICommentsService["getCommentsByPostId"] = (
    postId,
  ) => http.get<GetCommentsByPostIdDTO>(`${urlPrefix}/${postId}/comments`);

  const getById: ICommentsService["getById"] = (commentId) =>
    http.get<GetCommentByIdDTO>(`${urlPrefix}/${commentId}`);

  return { getCommentsByPostId, getById };
};
