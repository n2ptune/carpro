<script setup lang="ts">
import { useMyTemplate, templates as defaultTemplates } from '~/hooks/templates'

interface Props {
  formRef: any
}

const props = defineProps<Props>()
const { isLoadingMyTemplate, myTemplates, refresh } = useMyTemplate()
const isActiveAddTemplateModal = ref(false)
// 아직 등록되지 않은 템플릿
const notRegisteredTemplates = computed<TemplateMetaWithRegister[]>(() => {
  const checkRegister = (template: TemplateMeta) => {
    return !!myTemplates.value.find(
      (myTemplate) =>
        `${myTemplate.theme}-${myTemplate.type}` ===
        `${template.theme}-${template.type}`
    )
  }

  return defaultTemplates
    .map((template) => ({
      ...template,
      registered: checkRegister(template)
    }))
    .filter((template) => template.supported)
})

const onClickAddTemplate = () => {
  isActiveAddTemplateModal.value = !isActiveAddTemplateModal.value
}
</script>

<template>
  <div v-if="$props.formRef && !isLoadingMyTemplate" class="my-4 lg:my-12">
    <div class="text-xl lg:text-2xl font-bold mb-6">내 템플릿 관리</div>
    <div class="mb-2">
      <UButton
        variant="solid"
        color="primary"
        leading
        leading-icon="i-heroicons-squares-plus"
        @click="onClickAddTemplate"
      >
        템플릿 추가하기
      </UButton>
    </div>
    <TemplatesMyList :templates="myTemplates" />
  </div>
  <div v-else class="space-x-4 flex py-4">
    <div class="">
      <USkeleton class="h-12 w-12 rounded-full" />
    </div>
    <div class="space-y-4">
      <USkeleton class="h-6 w-[350px]" />
      <USkeleton class="h-6 w-[280px]" />
      <USkeleton class="h-6 w-[420px]" />
    </div>
  </div>
  <UModal v-model="isActiveAddTemplateModal">
    <TemplatesMyAddTemplate
      :template-options="notRegisteredTemplates"
      @close="isActiveAddTemplateModal = false"
    />
  </UModal>
</template>
