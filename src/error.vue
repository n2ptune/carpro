<script setup lang="ts">
const props = defineProps<{ error: any }>()
</script>

<template>
  <div
    class="w-screen h-screen flex justify-center items-center flex-col space-y-1"
  >
    <div class="font-bold text-xl">{{ error.statusCode }}</div>
    <div>{{ error.message }}</div>
  </div>
</template>
