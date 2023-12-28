<script setup lang="ts">
import { templates as defaultTemplates } from '~/hooks/templates'

interface Props {
  template: Template
}

const props = defineProps<Props>()

const findTemplateMeta = (template: Template) => {
  return defaultTemplates
    .filter((t) => t.supported)
    .find((t) => t.uid === template.metaUid) as TemplateMeta
}

const onClickTemplate = (template: Template) => {
  window.open(`/w/${template.uid}`, '_blank')
}

// 템플릿 액션
const templateActions = [
  [
    {
      label: '템플릿 삭제',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        console.log(props.template)
      }
    }
  ],
  [
    {
      label: '템플릿 보기',
      icon: 'i-heroicons-arrow-right',
      click: () => {
        onClickTemplate(props.template)
      }
    },
    {
      label: 'PDF 다운로드',
      icon: 'i-heroicons-document-text',
      disabled: true
    }
  ]
]
</script>

<template>
  <div class="flex justify-between items-center">
    <div
      class="space-y-2 cursor-pointer"
      @click="() => onClickTemplate(template)"
    >
      <div class="text-2xl font-bold">
        {{ findTemplateMeta(template).name }}
      </div>
      <div class="text-gray-400">
        {{ $dayjs(template.createdAt).fromNow() }}에 생성됨
      </div>
    </div>
    <div>
      <UDropdown :items="templateActions" :popper="{ placement: 'bottom' }">
        <UButton
          icon="i-heroicons-ellipsis-vertical"
          variant="ghost"
          color="gray"
          size="xl"
          :padded="false"
        />
      </UDropdown>
    </div>
  </div>
</template>
