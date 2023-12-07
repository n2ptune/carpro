<script setup lang="ts">
import { useBreadcrumbsStore } from '~/store/breadcrumbs'

const route = useRoute()
const { canDisplayBreadcrumbs, label, setBreadcrumbs } = useBreadcrumbsStore()

watch(
  () => route.path,
  (_n, _o) => {
    setBreadcrumbs(route.meta.breadcrumbsLabel as string)
  },
  { immediate: true }
)
</script>

<template>
  <div
    v-if="!!canDisplayBreadcrumbs"
    class="text-left text-lg lg:font-2xl font-bold my-12"
  >
    {{ label }}
  </div>
</template>
