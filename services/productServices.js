import { useApi } from "@/composables/useApi";

const module = "product";

export const fetchProducts = async (page = 1, limit = 10) => {
  return await useApi(`/${module}?page=${page}&limit=${limit}`);
};

export const createProduct = async (product) => {
  return await useApi(`/${module}`, {
    method: "POST",
    body: product,
  });
};

export const updateProduct = async (id, updatedProduct) => {
  return await useApi(`/${module}/${id}`, {
    method: "PUT",
    body: updatedProduct,
  });
};

export const deleteProduct = async (id) => {
  return await useApi(`/${module}/${id}`, {
    method: "DELETE",
  });
};
