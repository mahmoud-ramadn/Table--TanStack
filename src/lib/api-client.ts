import NProgress from "nprogress";
import {ofetch} from "ofetch";

// Configure NProgress
NProgress.configure({showSpinner: false});

type options = {
  url?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  retry?: number;
  timeout?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?:any;
};

/**
 * Makes an HTTP request to the specified URL with the given options.
 *
 * @param options - The options for the request.
 * @param options.url - The URL for the request. If not provided, it defaults to the VITE_API_URL environment variable.
 * @param options.method - The HTTP method for the request. Defaults to "GET".
 * @param options.retry - The number of times to retry the request on failure. Defaults to 2.
 * @param options.timeout - The timeout for the request in milliseconds. Defaults to 10000.
 * @returns A promise that resolves to the response data.
 */
export const apiClient = async <T>(options: options = {}): Promise<T> => {
  try {
    const {url, method = "GET", retry = 2, timeout = 10000, body } = options;

    const baseURL = url?.includes("http") ? url : import.meta.env.VITE_API_URL;

    if (!baseURL) {
      throw new Error("Base URL is required");
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const token = localStorage.getItem("token");

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await ofetch<T>(baseURL, {
      method,
      headers,
      body,
      retry,
      timeout,
      onRequest: () => {
        NProgress.start();
      },
      onResponse: () => {
        NProgress.done();
      },
    });

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return Promise.reject(error);
  }
};
