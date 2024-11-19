<template>
  <div className="flex flex-col h-screen">
    <DashboardHeader
      :isSidebarOpen="isSidebarOpen"
      @toggleSidebar="toggleSidebar"
    />
    <div className="flex flex-grow mt-16 md:ml-64">
      <DashboardSidebar
        :isSidebarOpen="isSidebarOpen"
        @toggleSidebar="toggleSidebar"
      />
      <div
        v-if="isSidebarOpen"
        class="flex sm:hidden h-screen w-screen fixed top-0 left-0 backdrop-blur z-[41] transition-opacity duration-300 opacity-100"
        @click="toggleSidebar"
      ></div>
      <main className="flex-grow p-4 bg-gray-100 overflow-hidden">
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
