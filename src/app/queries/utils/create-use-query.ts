import { QueryState, useQuery } from ".";
import { QueryFn } from "..";

type UseQueryFnWithoutParams<TResponse> = () => QueryState<TResponse>;
type UseQueryFnWithParams<TParams, TResponse> = (
  params: TParams,
) => QueryState<TResponse>;

export function createUseQuery<TResponse>(
  queryFn: QueryFn<void, TResponse>,
): UseQueryFnWithoutParams<TResponse>;
export function createUseQuery<TParams, TResponse>(
  queryFn: QueryFn<TParams, TResponse>,
): UseQueryFnWithParams<TParams, TResponse>;
export function createUseQuery<TParams = void, TResponse = void>(
  queryFn: QueryFn<TParams, TResponse>,
) {
  return function (params?: TParams): QueryState<TResponse> {
    // Check if `params` is provided and call `useQuery` accordingly
    if (params !== undefined) {
      // Params are provided, pass them to `useQuery`
      return useQuery({ queryFn, params }) as QueryState<TResponse>;
    } else {
      // Params are not provided, call `useQuery` without `params`
      return useQuery({
        queryFn: queryFn as QueryFn<void, TResponse>,
      }) as QueryState<TResponse>;
    }
  };
}
