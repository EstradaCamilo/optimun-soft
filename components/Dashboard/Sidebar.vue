<template>
  <aside
    class="`w-64 min-w-64 inset-y-0 top-0 left-0 transform transition-transform duration-300 ease-in-out sm:relative sm:translate-x-0 z-50 bg-white"
    :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    style="position: fixed"
  >
    <div
      className="h-16 flex gap-4 items-center py-4 px-6 border-r sm:border-r-0 border-b"
    >
      <UIcon :name="siteConfig.logo" class="size-8 text-primary" />
      <p className="text-xl font-medium">{{ siteConfig.name }}</p>
    </div>
    <div
      className="h-full max-h-[calc(100vh-64px)] p-4  flex flex-col justify-between border-r"
    >
      <UVerticalNavigation
        :links="siteConfig.links"
        @click="$emit('toggleSidebar')"
      />
    </div>
  </aside>
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
