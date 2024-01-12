<script setup lang="ts">
interface Props {
  mainLabel?: string
  subLabel?: string
  viewDate?: boolean
  startDate?: number
  endDate?: Nullable<number>
  currently?: boolean
}

withDefaults(defineProps<Props>(), {
  viewDate: false,
  currently: false
})

const { $dayjs } = useNuxtApp()
const transformDate = (date: number) => $dayjs(date).format('YYYY-MM')
</script>

<template>
  <div class="basis-[100%] lg:basis-[25%]">
    <div class="space-y-2">
      <div class="text-2xl">
        <slot name="main-label" :util="{ transformDate }">
          {{ mainLabel }}
        </slot>
      </div>
      <div class="text-sm">
        <slot name="sub-label" :util="{ transformDate }">
          {{ subLabel }}
        </slot>
      </div>
      <div
        v-if="viewDate"
        class="text-sm text-gray-400 dark:text-gray-500 space-x-2"
      >
        <span>
          {{ startDate ? transformDate(startDate) : startDate }}
        </span>
        <span>~</span>
        <span v-if="currently" class="text-primary-500">
          <slot name="currently" :util="{ transformDate }">재직중</slot>
        </span>
        <span v-else-if="endDate">
          {{ endDate ? transformDate(endDate) : endDate }}
        </span>
      </div>
      <slot name="label-more" :util="{ transformDate }" />
    </div>
  </div>
  <div class="basis-[100%] lg:flex-1">
    <slot name="content" :util="{ transformDate }" />
  </div>
</template>
