<script setup lang="ts">
interface Props {
  templateOptions: TemplateMetaWithRegister[]
}

type Emits = {
  close: []
  add: [item: TemplateMetaWithRegister]
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const selected = ref<TemplateMetaWithRegister>()
const toast = useToast()
const computedOptions = computed(() =>
  props.templateOptions.map((template) => ({
    ...template,
    disabled: template.registered
  }))
)

const onClickAddTemplate = () => {
  if (!selected.value) {
    return toast.add({
      title: '알림',
      description: '추가할 템플릿을 선택해주세요.'
    })
  }

  emits('add', selected.value)
}
</script>

<template>
  <UCard :ui="{ ring: '' }">
    <template #header> 템플릿 추가 </template>
    <div class="space-y-2">
      <UFormGroup label="템플릿 선택" required class="w-72">
        <USelectMenu
          v-model="selected"
          placeholder="템플릿을 선택하세요."
          by="uid"
          option-attribute="name"
          :options="computedOptions"
        />
      </UFormGroup>

      <UButton :disabled="!selected" ccolor="primary">
        템플릿 미리보기
      </UButton>
    </div>

    <template #footer>
      <div class="mx-auto text-center space-x-2">
        <UButton color="primary" variant="solid" @click="onClickAddTemplate">
          추가
        </UButton>
        <UButton color="gray" variant="solid" @click="emits('close')">
          취소
        </UButton>
      </div>
    </template>
  </UCard>
</template>
