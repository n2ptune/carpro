<script setup lang="ts">
import { useTemplate } from '~/hooks/templates'

definePageMeta({
  layout: 'default'
})

const { isLoadingTemplate, templateData } = await useTemplate()
console.log(isLoadingTemplate.value, templateData.value)
</script>

<template>
  <div>test {{ $route.params.slug }}</div>
</template>
