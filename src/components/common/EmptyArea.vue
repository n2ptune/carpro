<script setup lang="ts">
interface Props {
  label: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="text-sm text-gray-300 dark:text-gray-600 flex justify-center items-center min-h-[250px]"
  >
    {{ label }}
  </div>
</template>
