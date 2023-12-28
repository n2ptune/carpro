<script setup lang="ts">
import { useBreadcrumbsStore } from '~/store/breadcrumbs'

const route = useRoute()
const breadcrumbsStore = useBreadcrumbsStore()
const { canDisplayBreadcrumbs, label } = storeToRefs(breadcrumbsStore)

watch(
  () => route.path,
  (_n, _o) => {
    breadcrumbsStore.setBreadcrumbs(route.meta.breadcrumbsLabel as string)
  },
  { immediate: true }
)
</script>

<template>
  <div
    v-if="!!canDisplayBreadcrumbs"
    class="text-left text-xl lg:text-2xl font-bold mt-12 mb-8"
  >
    {{ label }}
  </div>
</template>
