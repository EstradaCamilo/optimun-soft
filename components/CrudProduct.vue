<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="font-medium">{{ title[action] }}</h2>
        <ButtonClose @click="emits('closeModal')" />
      </div>
    </template>
    <UForm
      class="space-y-4"
      :state="form"
      :schema="schemaSubmit[action]"
      @submit="handleFormSubmit"
    >
      <div v-if="['add', 'update'].includes(action)" class="space-y-4">
        <UFormGroup name="barcode" label="Código" required>
          <UInput v-model="form.barcode" placeholder="Código" />
        </UFormGroup>
        <UFormGroup name="name" label="Nombre" required>
          <UInput v-model="form.name" placeholder="Nombre" />
        </UFormGroup>
        <UFormGroup name="description" label="Descripción" required>
          <UTextarea v-model="form.description" placeholder="Descripción" />
        </UFormGroup>
        <div class="grid sm:grid-cols-2 gap-4">
          <UFormGroup name="selling_price" label="Precio de venta" required>
            <UInput
              v-model="form.selling_price"
              placeholder="Precio de venta"
              type="number"
              min="0"
            />
          </UFormGroup>
          <UFormGroup name="product_cost" label="Costo de producto" required>
            <UInput
              v-model="form.product_cost"
              placeholder="Costo de producto"
              type="number"
              min="0"
            />
          </UFormGroup>
        </div>
        <UFormGroup name="id_category" label="Categoría" required>
          <USelect
            v-model="form.id_category"
            :options="selectOptions.categories || []"
            placeholder="Seleccione una categoría"
            option-attribute="name"
          />
        </UFormGroup>
        <UCheckbox
          v-model="form.service"
          name="service"
          label="Es un servicio"
        />
        <UFormGroup name="taxes" label="Impuestos">
          <USelectMenu
            v-model="form.taxes"
            :options="selectOptions.taxes || []"
            multiple
            placeholder="Seleccione los impuestos"
            option-attribute="name"
            by="code"
            :popper="{ placement: 'top-end' }"
          >
            <template #label>
              <span v-if="form.taxes.length" class="truncate">
                {{ form.taxes.length }}
                {{ `Seleccionado${form.taxes.length > 1 ? "s" : ""}` }}
              </span>
              <span v-else>Seleccione los impuestos</span>
            </template>
          </USelectMenu>
        </UFormGroup>
      </div>

      <div v-if="'delete' == action">
        <p>
          Se eliminara el producto
          <span class="font-medium">{{ form.name }}</span> y no hay vuelta atras
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <UButton
          type="button"
          block
          color="gray"
          variant="solid"
          label="Cancelar"
          @click="emits('closeModal')"
        />
        <UButton
          type="submit"
          block
          :label="labelSubmit[action]"
          :loading="productStore.loadingAction"
        />
      </div>
    </UForm>
  </UCard>
</template>

<script setup>
import { useProductStore } from "@/stores/useProductStore";
import { productSchema } from "@/schemas/productSchema";
const props = defineProps({
  initialData: {
    type: [null, Object],
    default: null,
  },
  action: {
    type: String,
    required: true,
    validator: (value) => ["add", "update", "delete"].includes(value),
  },
  selectOptions: {
    type: Object,
    default: {},
  },
});

const { action, initialData, selectOptions } = props;

const emits = defineEmits(["closeModal"]);

const title = {
  add: "Crear producto",
  update: "Actualizar producto",
  delete: "¿Estas seguro?",
};
const labelSubmit = {
  add: "Crear",
  update: "Actualizar",
  delete: "Si, eliminar",
};

const schemaSubmit = {
  add: productSchema,
  update: productSchema,
  delete: undefined,
};

const productStore = useProductStore();

const form = reactive({
  _id: null,
  barcode: "",
  name: "",
  id_category: null,
  description: "",
  service: false,
  selling_price: null,
  product_cost: null,
  taxes: [],
});

const resetForm = () => {
  Object.assign(form, {
    _id: null,
    barcode: "",
    name: "",
    id_category: null,
    description: "",
    service: false,
    selling_price: null,
    product_cost: null,
    taxes: [],
  });
};

const handleAdd = async (data) => {
  const { _id, ...restData } = data;
  console.log("add", restData);
  await productStore.createProduct(restData);
};

const handleUpdate = async (data) => {
  const { _id, ...restData } = data;
  await productStore.updateProduct(_id, restData);
};

const handleDelete = async (data) => {
  await productStore.deleteProduct(data._id);
};

const actionsHandles = {
  add: handleAdd,
  update: handleUpdate,
  delete: handleDelete,
};

const handleFormSubmit = async (event) => {
  try {
    const handleFunction = actionsHandles[action];
    if (handleFunction) {
      await handleFunction(event.data);
      await productStore.fetchProducts();
      emits("closeModal");
    }
  } catch (err) {
    console.error(`Error al realizar la acción ${action}:`, err);
  }
};

onMounted(async () => {
  if (["update", "delete"].includes(action) && initialData) {
    Object.keys(form).forEach((key) => {
      if (initialData[key] !== undefined) {
        form[key] = initialData[key];
      }
    });
    // Set id_category
    form.id_category = initialData.category?._id ?? null;
    // Set taxes, delete _id
    form.taxes =
      initialData.taxes?.map((tax) => {
        return {
          code: tax?.code,
          name: tax?.name,
          percentage: tax?.percentage,
        };
      }) || [];
  }
});

onUnmounted(() => {
  resetForm();
});
</script>
