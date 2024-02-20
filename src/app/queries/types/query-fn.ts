export type QueryFn<TParams = void, TResponse = void> = TParams extends undefined
  ? (params?: TParams) => Promise<TResponse>
  : (params: TParams) => Promise<TResponse>;
