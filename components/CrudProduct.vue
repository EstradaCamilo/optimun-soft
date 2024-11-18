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
            :options="categoriesOptions"
            placeholder="Seleccione una categoría"
            option-attribute="name"
          />
        </UFormGroup>
        <UCheckbox
          v-model="form.service"
          name="service"
          label="Es un servicio"
        />
        <UFormGroup name="taxes" label="Impuestos" required>
          <USelectMenu
            v-model="form.taxes"
            :options="taxesOptions"
            multiple
            placeholder="Seleccione los impuestos"
            option-attribute="name"
            by="code"
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
import { fetchCategories } from "@/services/categoryServices";
import { fetchTaxes } from "@/services/taxServices";
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
});

const { action, initialData } = props;

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
  id_category: null,
  name: "",
  description: "",
  service: false,
  selling_price: null,
  product_cost: null,
  taxes: [],
});

const categoriesOptions = ref([]);
const taxesOptions = ref([]);

form.name = "Example";
form.description = "Example";
form.selling_price = 250000;
form.product_cost = 200000;

const handleAdd = async () => {
  const { _id, ...restForm } = form;
  await productStore.createProduct(restForm);
};

const handleUpdate = async () => {
  const { _id, ...restForm } = form;
  await productStore.updateProduct(_id, restForm);
};

const handleDelete = async () => {
  await productStore.deleteProduct(form._id);
};

const actionsHandles = {
  add: handleAdd,
  update: handleUpdate,
  delete: handleDelete,
};

const handleFormSubmit = async (event) => {
  const handleFunction = actionsHandles[action];
  if (handleFunction) await handleFunction(event.data);
};

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
    return data.value?.body?.reduce((acc, currentTax) => {
      if (!acc.some((tax) => tax.code === currentTax.code)) {
        acc.push(currentTax);
      }
      return acc;
    }, []);
  } catch (error) {
    console.error(error);
  }
  return [];
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
  }
  if (["add", "update"].includes(action)) {
    categoriesOptions.value = await getCategoriesOptions();
    taxesOptions.value = await getTaxesOptions();
  }
});
</script>
