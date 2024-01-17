<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  message?: string
  okButtonText?: string
  cancelButtonText?: string
}

type Emits = {
  'update:model-value': [boolean]
  confirm: []
  cancel: []
  close: []
}

const props = withDefaults(defineProps<Props>(), {
  okButtonText: '확인',
  cancelButtonText: '취소'
})
const emits = defineEmits<Emits>()
const active = computed({
  get: () => props.modelValue,
  set: (bool: boolean) => emits('update:model-value', bool)
})
</script>

<template>
  <UModal v-model="active" :ui="{ width: 'w-full sm:max-w-[20rem]' }">
    <UCard :ui="{ ring: '' }">
      <template v-if="title" #header> {{ title }}</template>

      <slot>
        <div class="text-center">{{ message }}</div>
      </slot>

      <template #footer>
        <div class="flex justify-center space-x-2">
          <UButton
            size="lg"
            variant="solid"
            color="primary"
            :label="okButtonText"
            @click="$emit('confirm')"
          />
          <UButton
            size="lg"
            variant="solid"
            color="gray"
            :label="cancelButtonText"
            @click="$emit('cancel')"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
