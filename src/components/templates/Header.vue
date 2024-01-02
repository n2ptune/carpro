<script setup lang="ts">
import { useTemplateStore } from '~/store/template'

const templateStore = useTemplateStore()
const { userProfileData } = storeToRefs(templateStore)
</script>

<template>
  <header class="fixed top-0 left-0 w-full p-3 backdrop-blur">
    <div class="flex justify-between items-center">
      <div class="hidden lg:block"></div>
      <div>
        <p class="font-bold inline-block">{{ userProfileData?.name }}</p>
        {{ userProfileData?.position }}
      </div>
      <div></div>
    </div>
  </header>
</template>
