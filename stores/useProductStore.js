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
  const currentPage = ref(1);
  const totalPages = ref(1);
  const perPage = ref(5);
  const totalProducts = ref(0);

  const fetchProducts = async () => {
    loadingProducts.value = true;
    try {
      const { data, error: fetchError } = await fetchProductsService(
        currentPage.value,
        perPage.value
      );
      if (fetchError.value) throw fetchError.value;
      products.value = data.value?.data?.products || [];
      currentPage.value = data.value?.data?.meta?.page;
      totalPages.value = data.value?.data?.meta?.totalPages;
      totalProducts.value = data.value?.data?.meta?.totalProducts;
    } catch (err) {
      toastService.error({ description: "Error al cargar productos" });
    } finally {
      loadingProducts.value = false;
    }
  };

  const createProduct = async (product) => {
    loadingAction.value = true;
    try {
      const { error: fetchError } = await createProductService(product);
      if (fetchError.value) throw fetchError.value;
      toastService.success({ description: "Producto creado" });
      await fetchProducts();
    } catch (err) {
      toastService.error({ description: "Error al crear producto" });
    } finally {
      loadingAction.value = false;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    loadingAction.value = true;
    try {
      const { error: fetchError } = await updateProductService(
        id,
        updatedProduct
      );
      if (fetchError.value) throw fetchError.value;
      toastService.success({ description: "Producto actualizado" });
      await fetchProducts();
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
      toastService.success({ description: "Producto eliminado" });
      await fetchProducts();
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
    currentPage,
    totalPages,
    perPage,
    totalProducts,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
});
