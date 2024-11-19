<template>
  <div class="flex flex-col h-screen">
    <DashboardSidebar
      :isSidebarOpen="isSidebarOpen"
      @toggleSidebar="toggleSidebar"
    />

    <div
      v-if="isSidebarOpen"
      class="flex sm:hidden h-screen w-screen fixed top-0 left-0 backdrop-blur z-[41] transition-opacity duration-300 opacity-100"
      @click="toggleSidebar"
    ></div>

    <div class="sm:ml-64 flex flex-col flex-grow">
      <DashboardHeader
        :isSidebarOpen="isSidebarOpen"
        @toggleSidebar="toggleSidebar"
      />
      <main class="flex-grow p-4 overflow-y-auto bg-gray-100">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
