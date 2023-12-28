<script setup lang="ts">
interface Props {
  templates: Template[]
}

defineProps<Props>()
</script>

<template>
  <div v-if="templates.length" class="mt-4 space-y-4">
    <div
      v-for="template in templates"
      :key="template.uid"
      class="area p-4 lg:px-8 lg:py-4 hover:!border-primary-400 transition-colors duration-300"
    >
      <TemplatesMyListItem :template="template" />
    </div>
  </div>
</template>
