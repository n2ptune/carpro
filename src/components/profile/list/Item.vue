<script setup lang="ts" generic="T">
interface Props {
  item: T
  canItemToPrev?: boolean // 위로 이동 조건부
  canItemToNext?: boolean // 아래로 이동 조건부
}

type Emits = {
  delete: []
  change: []
}

defineProps<Props>()
const emits = defineEmits<Emits>()

const itemDropdownMenus = [
  [
    {
      label: '삭제',
      icon: 'i-heroicons-trash-solid',
      click: () => {
        emits('delete')
      }
    },
    {
      label: '수정',
      icon: 'i-heroicons-pencil-square-solid',
      click: () => {
        emits('change')
      }
    }
  ],
  /**
   * @todo change ordering items
   */
  [
    {
      label: '위로 이동',
      icon: 'i-heroicons-chevron-up',
      click: () => {},
      disabled: true
    },
    {
      label: '아래로 이동',
      icon: 'i-heroicons-chevron-down',
      click: () => {},
      disabled: true
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
        <slot name="description" :item="item" />
      </div>
      <slot name="actions" :item="{ item }">
        <UDropdown :items="itemDropdownMenus">
          <UButton
            icon="i-heroicons-ellipsis-vertical"
            color="gray"
            variant="link"
            :padded="false"
          />
        </UDropdown>
      </slot>
    </div>
  </div>
</template>
