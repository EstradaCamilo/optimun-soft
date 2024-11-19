<template>
  <div class="space-y-4">
    <!-- Title -->
    <h1 class="font-medium">Productos</h1>

    <!-- Action -->
    <div>
      <UButton
        @click="handleAdd"
        icon="i-ph-plus"
        label="Nuevo producto"
        :trailing="false"
      />
    </div>

    <!-- Table -->
    <UTable
      :columns="productStore.columns"
      :rows="productStore.products"
      :loading="productStore.loadingProducts"
    >
      <template #name-data="{ row }">
        <div class="sm:max-w-[250px] sm:truncate sm:...">
          {{ row?.name }}
        </div>
      </template>

      <template #category.name-data="{ row }">
        <span class="capitalize">{{ row?.category?.name }}</span>
      </template>

      <template #description-data="{ row }">
        <div class="sm:max-w-[250px] sm:truncate sm:...">
          {{ row?.description }}
        </div>
      </template>

      <template #selling_price-data="{ row }">
        {{ row?.selling_price ? formatPrice(row?.selling_price) : "-" }}
      </template>

      <template #actions-data="{ row }">
        <div class="flex gap-2">
          <UTooltip text="Editar" :popper="{ arrow: true }">
            <UButton
              class="p-1"
              color="gray"
              variant="link"
              icon="i-ph-pencil-simple-line"
              @click="handleUpdate(row)"
            />
          </UTooltip>
          <UTooltip text="Eliminar" :popper="{ arrow: true }">
            <UButton
              class="p-1"
              color="gray"
              variant="link"
              icon="i-ph-trash"
              @click="handleDelete(row)"
            />
          </UTooltip>
        </div>
      </template>
    </UTable>

    <!-- Pagination -->
    <div class="flex items-center justify-between gap-4">
      <UPagination
        v-model="productStore.currentPage"
        :page-count="productStore.perPage"
        :total="productStore.totalProducts"
        :max="2"
      />
      <div class="flex items-center gap-2">
        <!-- <span class="text-sm hidden sm:block">Por página</span> -->
        <USelect v-model="productStore.perPage" :options="perPageOptions" />
      </div>
    </div>

    <!-- Modal -->
    <UModal v-model="modal.isOpen" prevent-close>
      <CrudProduct
        :initialData="modal.initialData"
        :action="modal.action"
        :selectOptions="{
          taxes: taxesOptions,
          categories: categoriesOptions,
        }"
        @closeModal="closeModal"
      />
    </UModal>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/useProductStore";
import { formatPrice } from "@/utils/formatPrice";
import { fetchCategories } from "@/services/categoryServices";
import { fetchTaxes } from "@/services/taxServices";

definePageMeta({
  name: "index",
  layout: "dashboard",
});
useHead({
  title: "Productos",
});

const perPageOptions = [5, 10, 25, 50];
const productStore = useProductStore();

const modal = ref({
  isOpen: false,
  initialData: null,
  action: "add",
});

const openModal = (action, initialData = null) => {
  modal.value = { isOpen: true, action, initialData };
};

const closeModal = () => {
  modal.value = { isOpen: false, action: "add", initialData: null };
};

const handleAdd = () => {
  openModal("add");
};

const handleUpdate = (initialData) => {
  openModal("update", initialData);
};

const handleDelete = (initialData) => {
  openModal("delete", initialData);
};

watch(
  [() => productStore.currentPage, () => productStore.perPage],
  async ([newCurrentPage, newPerPage], [oldCurrentPage, oldPerPage]) => {
    if (newPerPage !== oldPerPage) {
      productStore.currentPage = 1;
    }
    await productStore.fetchProducts();
  }
);

const getCategoriesOptions = async () => {
  try {
    const { data, error: fetchError } = await fetchCategories();
    if (fetchError.value) throw fetchError.value;

    return data.value?.categories?.map((category) => {
      return {
        value: category._id,
        name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
      };
    });
  } catch (error) {
    console.error(error);
  }
  return [];
};
const getTaxesOptions = async () => {
  try {
    const { data, error: fetchError } = await fetchTaxes();
    if (fetchError.value) throw fetchError.value;
    // los impuestos tienen el mismo código, pero si no permito que se seleccionen todos, algunos productos presentan errores al no tener la opción disponible. hay 3 impuestos con el código "01", que corresponde al iva, por lo que al seleccionar uno, automáticamente se seleccionan los tres.
    return data.value?.body || [];
    // return data.value?.body?.reduce((acc, currentTax) => {
    //   if (!acc.some((tax) => tax.code === currentTax.code)) {
    //     acc.push(currentTax);
    //   }
    //   return acc;
    // }, []);
  } catch (error) {
    console.error(error);
  }
  return [];
};

const categoriesOptions = ref([]);
const taxesOptions = ref([]);

onMounted(async () => {
  await productStore.fetchProducts();
  categoriesOptions.value = await getCategoriesOptions();
  taxesOptions.value = await getTaxesOptions();
});
</script>
