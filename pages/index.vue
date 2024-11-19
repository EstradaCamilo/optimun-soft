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
        <div class="sm:max-w-[280px] sm:truncate sm:...">
          {{ row?.name }}
        </div>
      </template>

      <template #category.name-data="{ row }">
        <span class="capitalize">{{ row?.category?.name }}</span>
      </template>

      <template #description-data="{ row }">
        <div class="sm:max-w-[280px] sm:truncate sm:...">
          {{ row?.description }}
        </div>
      </template>

      <template #selling_price-data="{ row }">
        {{ row?.selling_price ? formatPrice(row?.selling_price) : "-" }}
      </template>

      <template #actions-data="{ row }">
        <div class="flex gap-2">
          <UButton
            class="p-1"
            color="gray"
            variant="link"
            icon="i-ph-pencil-simple-line"
            @click="handleUpdate(row)"
          />
          <UButton
            class="p-1"
            color="gray"
            variant="link"
            icon="i-ph-trash"
            @click="handleDelete(row)"
          />
        </div>
      </template>
    </UTable>

    <!-- Modal -->
    <UModal v-model="modal.isOpen" prevent-close>
      <CrudProduct
        :initialData="modal.initialData"
        :action="modal.action"
        @closeModal="closeModal"
      />
    </UModal>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/useProductStore";
import { formatPrice } from "@/utils/formatPrice";
definePageMeta({
  name: "index",
  layout: "dashboard",
});
useHead({
  title: "Inicio",
});

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
});

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
</script>
