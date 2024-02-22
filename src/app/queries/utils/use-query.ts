import { useEffect, useState } from "react";
import { QueryFn } from "..";

export type QueryState<TData> = {
  data?: TData;
  error?: Error;
  isLoading: boolean;
};

export type QueryOptions<T> = {
  enabled?: boolean;
  initialData?: T;
};

export function useQuery<TResponse>(props: {
  queryFn: QueryFn<void, TResponse>;
  options?: QueryOptions<TResponse>;
}): QueryState<TResponse>;
export function useQuery<TParams, TResponse>(props: {
  queryFn: QueryFn<TParams, TResponse>;
  params: TParams;
  options?: QueryOptions<TResponse>;
}): QueryState<TResponse>;
export function useQuery<TParams = void, TResponse = void>(props: {
  queryFn: (params?: TParams) => Promise<TResponse>;
  params?: TParams;
  options?: QueryOptions<TResponse>;
}) {
  // options
  const { enabled = true, initialData } = props.options || {};

  // rest
  const initialState = {
    data: initialData,
    isLoading: false,
    error: undefined,
  };

  const [state, setState] = useState<QueryState<TResponse>>(initialState);
  const updateState = <K extends keyof typeof state>(
    key: K,
    value: QueryState<TResponse>[K],
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const abortController = new AbortController(); // Instantiate a new AbortController
    const getData = async () => {
      if (!initialData) {
        updateState("isLoading", true);
      }
      try {
        const getRes = async () =>
          props.params !== undefined
            ? await props.queryFn(props.params)
            : await props.queryFn();
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
    if (enabled) {
      getData();
    }
    // Cleanup function to abort the request when the component unmounts or the effect is re-run
    return () => {
      abortController.abort();
    };
  }, [JSON.stringify(props.params), enabled]);

  return state;
}
