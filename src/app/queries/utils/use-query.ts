import { useEffect, useState } from "react";
import { QueryFn } from "..";

export type QueryState<TData> = {
  data?: TData;
  error?: Error;
  isLoading: boolean;
};

const initialState = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

export function useQuery<TResponse>(props: {
  queryFn: QueryFn<void, TResponse>;
}): QueryState<TResponse>;
export function useQuery<TParams, TResponse>(props: {
  queryFn: QueryFn<TParams, TResponse>;
  params: TParams;
}): QueryState<TResponse>;
export function useQuery<TParams = void, TResponse = void>(props: {
  queryFn: (params?: TParams) => Promise<TResponse>;
  params?: TParams;
}) {
  const [state, setState] = useState<QueryState<TResponse>>(initialState);
  const updateState = <K extends keyof typeof state>(
    key: K,
    value: QueryState<TResponse>[K],
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const getData = async () => {
      updateState("isLoading", true);
      try {
        const getRes = async () => {
          if (props.params !== undefined)
            return await props.queryFn(props.params);
          return await props.queryFn();
        };
        const res = await getRes();
        updateState("data", res);
      } catch (err) {
        if (err instanceof Error) {
          updateState("error", err);
        } else {
          updateState("error", new Error("An error occurred"));
        }
      } finally {
        updateState("isLoading", false);
      }
    };
    getData();
  }, [JSON.stringify(props.params)]);

  return state;
}
