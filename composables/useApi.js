import { useFetch } from "#imports";

export const useApi = (url, options = {}) => {
  const params = {
    baseURL: "/api",
    key: url,
    watch: false,
    ...options,
  };

  return useFetch(url, params);
};
