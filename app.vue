<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>

<script setup>
import { siteConfig } from "@/config/site";
useHead({
  titleTemplate: `%s - ${siteConfig.name}`,
});
</script>
