<script setup lang="ts">
interface Props {
  items: WorkItem[]
}

defineProps<Props>()

const { $dayjs } = useNuxtApp()
const transformDate = (date: number) => $dayjs(date).format('YYYY-MM')
</script>

<template>
  <TemplatesStandardContent
    class="[&>*+*]:border-t [&>*+*]:pt-4 [&>*+*]:border-gray-200 [&>*+*]:dark:border-gray-800 space-y-4"
  >
    <div
      v-for="(item, itemIdx) in items"
      :key="itemIdx"
      class="flex flex-wrap lg:flex-nowrap space-y-2 lg:space-y-0 lg:space-x-3"
    >
      <div class="basis-[100%] lg:basis-[25%]">
        <div class="space-y-2">
          <div class="text-2xl">{{ item.companyName }}</div>
          <div class="text-sm">{{ item.position }}</div>
          <div class="text-sm text-gray-400 dark:text-gray-500 space-x-2">
            <span>{{
              item.startDate ? transformDate(item.startDate) : item.startDate
            }}</span>
            <span>~</span>
            <span v-if="item.isCurrently" class="text-primary-500">재직중</span>
            <span v-else>{{
              item.endDate ? transformDate(item.endDate) : item.endDate
            }}</span>
          </div>
        </div>
      </div>
      <div class="basis-[100%] lg:flex-1">
        <ul class="list-outside list-disc">
          <li v-for="detail in item.children">
            {{ detail.text }}
          </li>
        </ul>
      </div>
    </div>
  </TemplatesStandardContent>
</template>
