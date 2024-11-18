import { useApi } from "@/composables/useApi";

const module = "category";

export const fetchCategories = async (page = 1, limit = 10) => {
  return await useApi(`/${module}?page=${page}&limit=${limit}`);
};
