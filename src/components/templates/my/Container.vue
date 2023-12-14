<script setup lang="ts">
interface Props {
  formRef: any
}

defineProps<Props>()

function onClickAddTemplate() {}
</script>

<template>
  <div v-if="$props.formRef" class="my-4 lg:my-12">
    <div class="text-xl lg:text-2xl font-bold mb-6">내 템플릿 관리</div>
    <div class="mb-2">
      <UButton
        variant="solid"
        color="primary"
        leading
        leading-icon="i-heroicons-squares-plus"
      >
        템플릿 추가하기
      </UButton>
    </div>
    <TemplatesMyList />
  </div>
</template>
