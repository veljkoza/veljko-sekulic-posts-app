import { QueryOptions, QueryState, useQuery } from ".";
import { QueryFn } from "..";

type UseQueryFnWithoutParams<TResponse> = (params?: {
  options?: QueryOptions;
}) => QueryState<TResponse>;
type UseQueryFnWithParams<TParams, TResponse> = (params: {
  params: TParams;
  options?: QueryOptions;
}) => QueryState<TResponse>;

export function createUseQuery<TResponse>(
  queryFn: QueryFn<void, TResponse>,
): UseQueryFnWithoutParams<TResponse>;
export function createUseQuery<TParams, TResponse>(
  queryFn: QueryFn<TParams, TResponse>,
): UseQueryFnWithParams<TParams, TResponse>;
export function createUseQuery<TParams = void, TResponse = void>(
  queryFn: QueryFn<TParams, TResponse>,
) {
  return function (props?: {
    params?: TParams;
    options?: QueryOptions;
  }): QueryState<TResponse> {
    // Check if `params` is provided and call `useQuery` accordingly
    if (props?.params !== undefined) {
      // Params are provided, pass them to `useQuery`
      return useQuery({
        queryFn,
        params: props.params,
        options: props.options,
      }) as QueryState<TResponse>;
    } else {
      // Params are not provided, call `useQuery` without `params`
      return useQuery({
        queryFn: queryFn as QueryFn<void, TResponse>,
        options: props?.options,
      }) as QueryState<TResponse>;
    }
  };
}
