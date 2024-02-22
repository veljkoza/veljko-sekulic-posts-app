import { httpClient } from "@/infrastructure";
import { GetCommentByIdDTO } from "@/models";
import { ServiceFn } from "./types";

export interface ICommentsService {
  getById: (commentId: string) => Promise<GetCommentByIdDTO>;
}

export const createCommentService: ServiceFn<ICommentsService> = ({
  url,
  http = httpClient,
}) => {
  const getById: ICommentsService["getById"] = (commentId) =>
    http.get<GetCommentByIdDTO>(`${url}/${commentId}`);

  return { getById };
};
