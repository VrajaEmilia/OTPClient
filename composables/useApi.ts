import axios from "axios";
import { useRuntimeConfig } from "nuxt/app";

export const useServerApi = () => {
  return axios.create({
    baseURL: "/", // Base URL for your API
  });
};

export const useApi = () => {
  const runtimeConfig = useRuntimeConfig();

  const api = axios.create({
    baseURL: runtimeConfig.public.apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  const get = async <T>(url: string, params?: any): Promise<T> => {
    const response = await api.get<T>(url, { params });
    return response.data;
  };

  const post = async <T>(url: string, data?: any): Promise<T> => {
    const response = await api.post<T>(url, data);
    return response.data;
  };

  const put = async <T>(url: string, data?: any): Promise<T> => {
    const response = await api.put<T>(url, data);
    return response.data;
  };

  const del = async <T>(url: string): Promise<T> => {
    const response = await api.delete<T>(url);
    return response.data;
  };

  return {
    get,
    post,
    put,
    delete: del,
  };
};
