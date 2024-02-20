import { httpClient } from "@/infrastructure";
import { GetAllPostsDTO, GetPostByIdDTO } from "@/models";
import { ServiceFn } from "./types";

export interface IPostsService {
  getAll: () => Promise<GetAllPostsDTO>;
  getById: (postId: string) => Promise<GetPostByIdDTO>;
}

export const createPostsService: ServiceFn<IPostsService> = (
  urlPrefix,
  http = httpClient,
) => {
  const getAll: IPostsService["getAll"] = () =>
    http.get<GetAllPostsDTO>(urlPrefix);
  const getById: IPostsService["getById"] = (postId) =>
    http.get<GetPostByIdDTO>(`${urlPrefix}/${postId}`);

  return { getAll, getById };
};
