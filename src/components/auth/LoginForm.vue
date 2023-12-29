<script setup lang="ts">
import type { FormError } from '#ui/types'

interface FormState {
  email: string
  password: string
}

const form = reactive<FormState>({
  email: '',
  password: ''
})
const formPasswordVisible = ref(false)
const formPasswordType = computed(() =>
  formPasswordVisible.value ? 'text' : 'password'
)
const formPasswordIcon = computed(() =>
  formPasswordVisible.value ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'
)

const validate = (state: FormState): FormError[] => {
  const errors = []
  if (!state.email)
    errors.push({
      path: 'email',
      message: '이메일은 필수 항목입니다.'
    })
  if (!state.password)
    errors.push({
      path: 'password',
      message: '비밀번호는 필수 항목입니다.'
    })
  return errors
}

const onClickChangeVisibleFormPassword = () => {
  formPasswordVisible.value = !formPasswordVisible.value
}
</script>

<template>
  <UForm :state="form" class="space-y-4 w-full lg:w-[300px]">
    <CommonLogoText class="text-center text-2xl lg:text-4xl mb-12" />

    <UFormGroup label="이메일" name="email" size="xl">
      <UInput
        v-model="form.email"
        type="email"
        size="md"
        placeholder="example@a.com"
      />
    </UFormGroup>

    <UFormGroup label="비밀번호" name="password" size="xl">
      <UInput
        v-model="form.password"
        :type="formPasswordType"
        size="md"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UIcon
            :name="formPasswordIcon"
            class="cursor-pointer hover:text-primary"
            @click="onClickChangeVisibleFormPassword"
          />
        </template>
      </UInput>
    </UFormGroup>

    <UButton type="submit" block size="xl">로그인</UButton>

    <UDivider label="OR" />

    <AuthProviderGoogleAuth />
  </UForm>
</template>
