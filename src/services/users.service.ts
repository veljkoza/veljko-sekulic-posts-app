import { httpClient } from "@/infrastructure";
import { GetAllUsersDTO, GetUserByIdDTO, User } from "@/models";
import { ServiceFn } from "./types";

export interface IUsersService {
  getById: (userId: number) => Promise<GetUserByIdDTO>;
  getAll: (urlParams?: Partial<User>) => Promise<GetAllUsersDTO>;
}

export const createUsersService: ServiceFn<IUsersService> = ({
  url,
  http = httpClient,
}) => {
  return {
    getById: (userId) => http.get<GetUserByIdDTO>(`${url}/${userId}`),
    getAll: (urlParams) => http.get<GetAllUsersDTO>(`${url}`, urlParams),
  };
};
