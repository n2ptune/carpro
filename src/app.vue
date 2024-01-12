<script setup lang="ts">
useHead({
  titleTemplate: (title) => (title ? `${title} - CARPRO` : 'CARPRO')
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
