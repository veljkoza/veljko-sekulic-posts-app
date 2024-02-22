import { httpClient } from "@/infrastructure";
import {
  GetAllPostsDTO,
  GetCommentsByPostIdDTO,
  GetPostByIdDTO,
  Post,
} from "@/models";
import { ServiceFn } from "./types";

export interface IPostsService {
  getAll: (urlParams?: Partial<Post>) => Promise<GetAllPostsDTO>;
  getById: (postId: number) => Promise<GetPostByIdDTO>;
  getCommentsByPostId: (postId: number) => Promise<GetCommentsByPostIdDTO>;
}

export const createPostsService: ServiceFn<IPostsService> = ({
  url,
  http = httpClient,
}) => {
  const getAll: IPostsService["getAll"] = (params) =>
    http.get<GetAllPostsDTO>(url, params);
  const getById: IPostsService["getById"] = (postId) =>
    http.get<GetPostByIdDTO>(`${url}/${postId}`);
  const getCommentsByPostId: IPostsService["getCommentsByPostId"] = (postId) =>
    http.get<GetCommentsByPostIdDTO>(`${url}/${postId}/comments`);

  return { getAll, getById, getCommentsByPostId };
};
