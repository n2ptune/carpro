<script setup lang="ts">
interface Props {
  label: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    class="mb-4 text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden"
  >
    {{ props.label }}
  </div>
</template>
