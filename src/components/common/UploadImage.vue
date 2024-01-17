<script setup lang="ts">
import { getDownloadURL } from 'firebase/storage'
import { getUploadImageTask } from '~/lib/image'

interface Props {
  accept?: string
  multiple?: boolean
}

type Emits = {
  loading: []
  progress: [percent: number]
  uploaded: [url: string]
  error: [error: any]
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

    // 이미지 업로드에 관련된 로직
    // 이미지 다중 건에 대해서는 추후에 개발, 지금은 다건만 업로드할 수 있도록 처리
    const task = getUploadImageTask(file[0])
    task.on(
      'state_changed',
      (snapshot) => {
        // 전송된 바이트 크기와 전송할 바이트 크기로 얼마정도 보내졌는지
        // 0 ~ 100 퍼센트로 환산하고 부모에 전파한다.
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        emits('progress', progress)
      },
      (error) => {
        // 업로드 에러 발생시 부모에 전파하고 토스트 메세지를 노출한다.
        emits('error', error)
        toast.add({
          title: '',
          description: '이미지 업로드에 실패하였습니다.' + '\n' + error.message
        })
        console.error(error)
      },
      async () => {
        // 이미지 업로드가 정상적으로 종료되었을 때
        // 로딩 상태를 전환하고, 접근할 수 있는 URL을 조회해서 부모에게 전파한다.
        isLoading.value = false
        const url = await getDownloadURL(task.snapshot.ref)
        emits('uploaded', url)
      }
    )
  }
}

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
