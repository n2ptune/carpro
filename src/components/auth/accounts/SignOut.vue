<script setup lang="ts">
import { deleteMyUser } from '~/lib/user'
import { useUserStore } from '~/store/user'

const isConfirm = ref(false)
const isLoading = ref(false)
const toast = useToast()

const onClickSignOutAccount = () => {
  isConfirm.value = true
}

const onDeleteUser = async () => {
  isConfirm.value = false

  try {
    await deleteMyUser()
    toast.add({
      title: '알림',
      description: '회원 탈퇴 처리하였습니다.'
    })
  } catch (error) {
    toast.add({
      title: '알림',
      description: '회원 탈퇴 처리에 문제가 발생하였습니다.' + '\n' + error
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="my-4 lg:my-12">
    <div class="text-xl lg:text-2xl font-bold mb-6">내 계정 관리</div>
    <UButton
      :loading="isLoading"
      variant="solid"
      color="primary"
      @click="onClickSignOutAccount"
    >
      회원 탙퇴하기
    </UButton>

    <ZConfirm
      v-model="isConfirm"
      message="정말 탈퇴하시겠습니까?"
      @confirm="onDeleteUser"
      @cancel="isConfirm = false"
      @close="isConfirm = false"
    />
  </div>
</template>
