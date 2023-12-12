<script setup lang="ts">
import type { Tab } from '~/hooks/tabs'

interface Props {
  tab: Tab
}

const props = defineProps<Props>()

const validateForm = () => {
  return [true, props.tab.field]
}

defineExpose({
  validateForm
})
</script>

<template>
  <ProfileItemBase :label="props.tab.name"> asdf </ProfileItemBase>
</template>
