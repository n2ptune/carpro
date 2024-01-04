<script setup lang="ts">
import { useTemplateStore } from '~/store/template'

const templateStore = useTemplateStore()
const { userProfileData } = storeToRefs(templateStore)
</script>

<template>
  <div class="container mx-auto my-6 lg:my-12">
    <div class="experience">
      <TemplatesStandardSectionTitle label="경력 사항" />
      <TemplatesStandardExperienceList
        v-if="userProfileData?.workItem"
        :items="userProfileData.workItem"
      />
    </div>
  </div>
</template>
