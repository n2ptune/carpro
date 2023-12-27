<script setup lang="ts">
interface Props {
  templates: Template[]
}

const props = defineProps<Props>()
</script>

<template>
  <div v-if="templates.length">{{ templates.length }}</div>
</template>
