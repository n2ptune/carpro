<script setup lang="ts">
interface Props {
  accept?: string
  multiple?: boolean
}

type Emits = {
  loading: []
  uploaded: []
}

const emits = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {
  accept: '.png, .jpg, .jpeg',
  multiple: false
})
const toast = useToast()

const isLoading = ref(false)
const fileRef = ref<HTMLInputElement | null>(null)

const onClickUserPhoto = () => {
  if (fileRef.value) {
    fileRef.value.click()
  }
}

const onChangeFile = () => {
  if (fileRef?.value) {
    // 파일 변수에 할당, 파일이 존재하지 않으면 함수 실행을 종료한다.
    const file = fileRef.value.files
    if (!file) return

    // multiple 옵션이 false인 경우 파일을 2개 이상 선택할 수 없지만
    // 선택된 경우 확인한다.
    if (!props.multiple && file.length > 1) {
      return toast.add({
        title: '알림',
        description: '이미지는 하나만 선택할 수 있습니다.'
      })
    }

    // 이미지 업로드 로직 실행 전/후 처리하기 위해 부모에
    // 업로드 실행 상태를 전파한다.
    isLoading.value = true
    emits('loading')

    // 이미지 업로드에 관련된 로직...
    // upload

    // 이미지 업로드가 정상적으로 종료되었을 때
    isLoading.value = false
    emits('uploaded')
  }
}

const uploadImage = async (file: FileList) => {}

defineExpose({
  fileRef
})
</script>

<template>
  <div @click="onClickUserPhoto">
    <slot />
    <input
      type="file"
      :accept="accept"
      :multiple="multiple"
      class="hidden"
      ref="fileRef"
      @change="onChangeFile"
    />
  </div>
</template>
