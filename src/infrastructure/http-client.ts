/* eslint-disable @typescript-eslint/no-explicit-any */
export const createHttpClient = (
  baseUrl = "",
  fetchFunction: typeof fetch = fetch,
) => {
  const combineUrls = (url: string) => `${baseUrl}${url}`;
  const generateUrlSearchParams = (params?: Record<string, any>) =>
    params ? `?${new URLSearchParams(params).toString()}` : "";

  const fetchWithBody = async <TResponse>(
    url: string,
    method: string,
    data?: { body?: any; params?: Record<string, any> },
  ) => {
    const response = await fetchFunction(
      `${combineUrls(url)}${generateUrlSearchParams(data?.params)}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data?.body),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json() as Promise<TResponse>;
  };

  const fetchWithoutBody = async <TResponse>(
    url: string,
    method: string,
    params?: Record<string, any>,
  ) => {
    const response = await fetchFunction(
      `${combineUrls(url)}${generateUrlSearchParams(params)}`,
      {
        method,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json() as Promise<TResponse>;
  };

  return {
    get: <TResponse>(url: string, params?: Record<string, any>) =>
      fetchWithoutBody<TResponse>(url, "GET", params),
    post: <TResponse>(
      url: string,
      data?: { body?: any; params?: Record<string, any> },
    ) => fetchWithBody<TResponse>(url, "POST", data),
    put: <TResponse>(
      url: string,
      data?: { body?: any; params?: Record<string, any> },
    ) => fetchWithBody<TResponse>(url, "PUT", data),
    delete: <TResponse>(url: string, params?: Record<string, any>) =>
      fetchWithoutBody<TResponse>(url, "DELETE", params),
  };
};

export type HttpClient = ReturnType<typeof createHttpClient>;

export const httpClient = createHttpClient(
  "https://jsonplaceholder.typicode.com",
);
