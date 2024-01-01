<script setup lang="ts">
definePageMeta({
  layout: 'loading',
  middleware: 'layout'
})
</script>

<template>
  <div>test {{ $route.params.slug }}</div>
</template>
