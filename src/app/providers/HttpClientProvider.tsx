import { HttpClient, httpClient as defaultHttpClient } from "@/infrastructure";
import { PropsWithChildren, createContext, useContext } from "react";
import { createQueries } from "../queries";

export type HttpClientContextValue = {
  queries: ReturnType<typeof createQueries>;
};

const HttpClientContext = createContext<HttpClientContextValue>(
  {} as HttpClientContextValue,
);

export const HttpClientProvider = ({
  children,
  httpClient = defaultHttpClient,
}: { httpClient: HttpClient } & PropsWithChildren) => {
  const queries = createQueries(httpClient);

  return (
    <HttpClientContext.Provider value={{ queries }}>
      {children}
    </HttpClientContext.Provider>
  );
};


export const useHttpClient = () => useContext(HttpClientContext)