<script setup lang="ts">
interface Props {
  label: string
}

defineProps<Props>()
</script>

<template>
  <div class="py-3 border-b-2 border-gray-600 dark:border-gray-700">
    <slot>
      <h3 class="text-2xl font-bold">{{ label }}</h3>
    </slot>
  </div>
</template>
