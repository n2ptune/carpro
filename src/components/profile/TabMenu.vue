<script setup lang="ts">
import type { Tab, TabField } from '~/hooks/tabs'

interface Props {
  tabs: Tab[]
}

type Emits = {
  change: [field: TabField]
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const naviTabs = computed(() => {
  return props.tabs.map((tab) => ({
    label: tab.name,
    field: tab.field,
    icon: tab.icon || ''
  }))
})

const onChangeTab = (index: number) => {
  emits('change', naviTabs.value[index].field)
}
</script>

<template>
  <div
    class="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700 space-y-2"
  >
    <div class="text-lg font-bold">메뉴</div>
    <UTabs
      :items="naviTabs"
      orientation="vertical"
      :default-index="0"
      @change="onChangeTab"
    >
      <template #default="{ item }">
        <div class="space-x-2">
          <UIcon :name="item.icon" />
          <span class="">{{ item.label }}</span>
        </div>
      </template>
    </UTabs>
  </div>
</template>
