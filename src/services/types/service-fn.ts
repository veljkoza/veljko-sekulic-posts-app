import { HttpClient } from "@/infrastructure";

export type ServiceFn<TReturn> = (params: {
  url: string;
  http?: HttpClient;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}) => TReturn;
