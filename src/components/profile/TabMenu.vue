<script setup lang="ts">
interface Props {
  tabs: Tab[]
  activeTab: Tab
}

type Emits = {
  change: [field: TabField]
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const selected = ref<number>(0)
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

watch(
  () => props.activeTab,
  (_n, _o) => {
    selected.value = naviTabs.value.findIndex(
      (tab) => tab.field === props.activeTab.field
    )
  }
)
</script>

<template>
  <div
    class="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700 space-y-2"
  >
    <div class="text-lg font-bold">메뉴</div>
    <UTabs
      v-model="selected"
      :items="naviTabs"
      orientation="vertical"
      :default-index="0"
      @change="onChangeTab"
      :ui="{
        list: {
          tab: {
            base: 'relative inline-flex items-center justify-start flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out'
          }
        }
      }"
    >
      <template #default="{ item }">
        <div class="text-left space-x-2">
          <UIcon :name="item.icon" />
          <span class="">{{ item.label }}</span>
        </div>
      </template>
    </UTabs>
  </div>
</template>
