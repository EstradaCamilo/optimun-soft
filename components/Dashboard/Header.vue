<template>
  <div class="h-16 border-b w-full flex items-center p-4">
    <UButton
      class="sm:hidden"
      :icon="isSidebarOpen ? 'i-ph-x' : 'i-ph-list'"
      size="sm"
      color="gray"
      square
      variant="soft"
      @click="$emit('toggleSidebar')"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["toggleSidebar"]);
</script>
