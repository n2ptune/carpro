<script setup lang="ts">
interface Props {
  workItem: WorkItem
}

const props = defineProps<Props>()
const { $dayjs } = useNuxtApp()

const transformDateFilter = (date?: number) => {
  if (!date || typeof date !== 'number') return date

  return $dayjs(date).format('YYYY-MM')
}

const workItemDropdownMenus = [
  [
    {
      label: '삭제',
      icon: 'i-heroicons-trash-solid',
      click: () => {}
    },
    {
      label: '수정',
      icon: 'i-heroicons-pencil-square-solid'
    }
  ]
]
</script>

<template>
  <div class="shadow">
    <div
      class="flex justify-between flex-nowrap py-3 px-6 bg-gray-300 dark:bg-gray-700 rounded-lg"
    >
      <div
        class="text-lg font-bold space-x-2 [&>*]:inline-block [&>*]:align-middle"
      >
        <div>{{ transformDateFilter(workItem.startDate) }}</div>
        <span>~</span>
        <div>
          {{
            workItem.isCurrently
              ? '재직중'
              : transformDateFilter(workItem.endDate)
          }}
        </div>
        <div class="truncate max-w-[130px] lg:max-w-[450px]">
          {{ workItem.companyName }}
        </div>
      </div>
      <UDropdown :items="workItemDropdownMenus">
        <UButton
          icon="i-heroicons-ellipsis-vertical"
          color="gray"
          variant="link"
          :padded="false"
        />
      </UDropdown>
    </div>
  </div>
</template>
