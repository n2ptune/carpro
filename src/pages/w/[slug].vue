<script setup lang="ts">
import { useTemplateStore } from '~/store/template'

definePageMeta({
  layout: 'loading',
  middleware: 'layout'
})

const templateStore = useTemplateStore()
const dynamicComponent = computed(() => {
  if (!templateStore.templateData?.type) return null

  return (
    {
      standard: resolveComponent('TemplatesStandardWrapper'),
      basic: null
    }[templateStore.templateData.type] || null
  )
})
</script>

<template>
  <UNotifications />
  <component :is="dynamicComponent" />
</template>
