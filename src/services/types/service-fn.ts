import { HttpClient } from "@/infrastructure";

export type ServiceFn<T> = (urlPrefix: string, httpClient?: HttpClient) => T;
