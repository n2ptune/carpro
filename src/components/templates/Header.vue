<script setup lang="ts">
import { useTemplateStore } from '~/store/template'

const templateStore = useTemplateStore()
const { userProfileData } = storeToRefs(templateStore)
</script>

<template>
  <header class="fixed top-0 left-0 w-full p-3 backdrop-blur-lg">
    <div class="flex justify-between items-center">
      <div class="text-sm">
        {{ userProfileData?.name
        }}<span v-if="userProfileData?.position" class="position">{{
          userProfileData.position
        }}</span>
      </div>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
.position::before {
  content: '\2022';
  @apply mx-1 text-lg;
}
</style>
