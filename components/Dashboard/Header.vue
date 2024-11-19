<template>
  <div
    class="h-16 border-b p-4 flex items-center justify-between fixed top-0 left-0 w-full bg-white z-10"
  >
    <UButton
      class="sm:hidden"
      :icon="isSidebarOpen ? 'i-ph-x' : 'i-ph-list'"
      size="sm"
      color="gray"
      square
      variant="soft"
      @click="$emit('toggleSidebar')"
    />
    <NuxtLink to="/" class="flex gap-2 items-center">
      <UIcon :name="siteConfig.logo" class="size-8 text-primary" />
      <p className="text-xl font-medium">{{ siteConfig.name }}</p>
    </NuxtLink>
  </div>
</template>

<script setup>
import { siteConfig } from "@/config/site";
const props = defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["toggleSidebar"]);
</script>
