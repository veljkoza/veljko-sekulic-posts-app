import { httpClient } from "@/infrastructure";
import { GetUserByIdDTO } from "@/models";
import { ServiceFn } from "./types";

export interface IUsersService {
  getById: (userId: number) => Promise<GetUserByIdDTO>;
}

export const createUsersService: ServiceFn<IUsersService> = ({
  url,
  http = httpClient,
}) => {
  return {
    getById: (userId) => http.get<GetUserByIdDTO>(`${url}/${userId}`),
  };
};
