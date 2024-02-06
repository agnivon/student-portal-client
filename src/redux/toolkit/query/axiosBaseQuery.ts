import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import assert from "assert";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";

assert(
  Boolean(process.env.NEXT_PUBLIC_API_HOST),
  new Error(`NEXT_PUBLIC_API_HOST not defined`)
);

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      withCredentials?: AxiosRequestConfig["withCredentials"];
      responseType?: AxiosRequestConfig["responseType"];
    },
    unknown,
    unknown
  > =>
  async ({
    url,
    method,
    data,
    params,
    headers,
    responseType,
    withCredentials = true,
  }) => {
    try {
      //console.log(url, method, data, params, headers);
      const instance = axios.create();
      const result = await instance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        responseType,
        withCredentials,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: {
          stack: error.stack,
          message: error.message,
          name: error.name,
          code: error.code,
          response: {
            data: error.response?.data,
            status: error.response?.status,
            statusText: error.response?.statusText,
          },
        },
      };
    }
  };

export default axiosBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_HOST as string,
});
