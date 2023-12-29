<script setup lang="ts">
import type { LayoutKey } from '#build/types/layouts'
import { useTemplate } from '~/hooks/templates'

definePageMeta({
  layout: 'loading'
})

const { templateData } = await useTemplate()

if (!templateData.value) {
  throw createError({ statusCode: 404, fatal: true })
}

const layoutMap = {
  '1': 'standard-light',
  '2': 'stnadard-dark'
}[templateData.value.metaUid]

setPageLayout(layoutMap as LayoutKey)
</script>

<template>
  <div>test {{ $route.params.slug }}</div>
</template>
