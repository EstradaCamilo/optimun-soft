import { useRuntimeConfig, useFetch } from "#imports";

export const useApi = (url, options = {}) => {
  const runtimeConfig = useRuntimeConfig();

  const params = {
    baseURL: runtimeConfig.public.API_URL,
    key: url,
    watch: false,
    ...options,
  };

  return useFetch(url, params);
};
