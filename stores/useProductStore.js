import { defineStore } from "pinia";
import { ref } from "vue";
import {
  fetchProducts as fetchProductsService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "@/services/productServices";
import { toastService } from "~/services/toastService";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const loadingProducts = ref(false);
  const loadingAction = ref(false);
  const columns = [
    {
      key: "barcode",
      label: "Código",
    },
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "description",
      label: "Descripción",
    },
    {
      key: "category.name",
      label: "Categoría",
    },
    {
      key: "selling_price",
      label: "Precio de venta",
    },
    {
      key: "actions",
      label: "Acciones",
    },
  ];

  const fetchProducts = async (page = 1, limit = 10) => {
    loadingProducts.value = true;
    try {
      const { data, error: fetchError } = await fetchProductsService(
        page,
        limit
      );
      if (fetchError.value) throw fetchError.value;
      products.value = data.value?.data?.products || [];
    } catch (err) {
      toastService.error({ description: "Error al cargar productos" });
    } finally {
      loadingProducts.value = false;
    }
  };

  const createProduct = async (product) => {
    loadingAction.value = true;
    try {
      const { data, error: fetchError } = await createProductService(product);
      if (fetchError.value) throw fetchError.value;
      products.value.push(data.value);
      toastService.success({ description: "Producto creado" });
    } catch (err) {
      toastService.error({ description: "Error al crear producto" });
    } finally {
      loadingAction.value = false;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    loadingAction.value = true;
    try {
      const { data, error: fetchError } = await updateProductService(
        id,
        updatedProduct
      );
      if (fetchError.value) throw fetchError.value;
      const index = products.value.findIndex((product) => product.id === id);
      if (index !== -1) products.value[index] = data.value;
      toastService.success({ description: "Producto actualizado" });
    } catch (err) {
      toastService.error({ description: "Error al actualizar producto" });
    } finally {
      loadingAction.value = false;
    }
  };

  const deleteProduct = async (id) => {
    loadingAction.value = true;
    try {
      const { error: fetchError } = await deleteProductService(id);
      if (fetchError.value) throw fetchError.value;
      products.value = products.value.filter((product) => product.id !== id);
      toastService.success({ description: "Producto eliminado" });
    } catch (err) {
      toastService.error({ description: "Error al eliminar producto" });
    } finally {
      loadingAction.value = false;
    }
  };

  return {
    products,
    loadingProducts,
    loadingAction,
    columns,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
});
