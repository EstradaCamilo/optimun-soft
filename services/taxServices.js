import { useApi } from "@/composables/useApi";

const module = "tax";

export const fetchTaxes = async (page = 1, limit = 10) => {
  return await useApi(`/${module}?page=${page}&limit=${limit}`);
};
