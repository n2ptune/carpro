<script setup lang="ts">
import { useMyTemplate } from '~/hooks/templates'

const { isLoadingMyTemplate, myTemplates } = useMyTemplate()
</script>

<template>
  <div>{{ myTemplates.length }}</div>
</template>
