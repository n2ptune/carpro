<script setup lang="ts">
import { useTemplateStore } from '~/store/template'

const templateStore = useTemplateStore()
const { userProfileData } = storeToRefs(templateStore)
</script>

<template>
  <div class="min-h-[450px] py-12 bg-primary-200 dark:bg-gray-900">
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
          </div>
          <div class="divider"></div>
          <div class="text-base mb-6">
            {{ userProfileData?.email }}
          </div>
          <div class="text-lg">
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

    @apply block w-[100px] h-px bg-gray-800 my-3 dark:bg-gray-700;
  }
}
</style>
