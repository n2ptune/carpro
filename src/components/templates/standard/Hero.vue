<script setup lang="ts">
import { useTemplateStore } from '~/store/template'

const templateStore = useTemplateStore()
const { userProfileData } = storeToRefs(templateStore)
</script>

<template>
  <div class="pt-12 pb-2 bg-primary-200 dark:bg-gray-900">
    <div class="container mx-auto my-6">
      <div class="flex flex-wrap justify-between">
        <div class="block">
          <div class="space-y-1">
            <div class="text-3xl font-bold">
              {{ userProfileData!.name }}
            </div>
            <div class="text-xl">
              {{ userProfileData?.position }}
            </div>
            <div class="text-lg">
              {{ userProfileData?.email }}
            </div>
          </div>
          <div class="divider"></div>
          <div class="text-lg whitespace-pre-line">
            {{ userProfileData?.intro }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.divider {
  &::before {
    content: '';

    @apply block w-[100px] h-px bg-gray-800 my-5 dark:bg-gray-700;
  }
}
</style>
