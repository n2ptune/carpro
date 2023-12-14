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
  <ProfileItemBase :label="props.tab.name">
    <UAlert
      title="참고"
      description="경력 사항이 없다면, 항목을 비워두면 됩니다. 템플릿에는 해당 항목이 보이지 않아요."
      icon="i-heroicons-information-circle"
      class="mb-4"
    />
  </ProfileItemBase>
</template>
