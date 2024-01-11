<script setup lang="ts">
import { useTemplateStore } from '~/store/template'

const templateStore = useTemplateStore()
const { userProfileData, isLoadaedData } = storeToRefs(templateStore)
</script>

<template>
  <div
    v-if="userProfileData && isLoadaedData"
    class="container mx-auto my-6 lg:my-12 space-y-12 lg:space-y-24"
  >
    <div class="experience">
      <TemplatesStandardSectionTitle label="경력 사항" />
      <TemplatesStandardExperienceList
        :items="userProfileData.workItem || []"
      />
    </div>
    <div class="awards">
      <TemplatesStandardSectionTitle label="수상 및 활동" />
      <TemplatesStandardAwardsList :items="userProfileData.awards || []" />
    </div>
  </div>
</template>
