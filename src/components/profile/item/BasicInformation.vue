<script setup lang="ts">
import { profileSymbol } from '~/hooks/profiles'
import type { Tab } from '~/hooks/tabs'

interface Props {
  tab: Tab
}

const props = defineProps<Props>()
const userProfile = inject<Ref<UserProfile>>(profileSymbol) as Ref<UserProfile>
const requiredError = reactive({
  templateName: false,
  name: false
})

const validateForm = () => {
  const validates = [
    {
      condition: () => userProfile.value.templateName,
      requiredErrorKey: 'templateName'
    },
    { condition: () => userProfile.value.name, requiredErrorKey: 'name' }
  ]

  const validated = validates.every((valid) => {
    if (!valid.condition()) {
      requiredError[valid.requiredErrorKey as 'templateName' | 'name'] = true
    }
    return valid.condition()
  })

  return [validated, props.tab.field]
}

defineExpose({
  validateForm
})
</script>

<template>
  <ProfileItemBase :label="props.tab.name">
    <div class="space-y-4">
      <UFormGroup
        label="프로필 템플릿 제목"
        help="프로필 템플릿 제목은 템플릿 가장 상단에 가장 큰 글씨로 표현되는 항목입니다."
        required
        :error="
          requiredError.templateName
            ? '프로필 템플릿 제목은 필수 항목입니다.'
            : ''
        "
      >
        <UInput
          v-model="userProfile.templateName"
          placeholder="프로필 템플릿 제목을 입력하세요."
          size="xl"
          :maxlength="20"
          @update:model-value="() => (requiredError.templateName = false)"
        />
      </UFormGroup>

      <UFormGroup
        label="이름"
        help="이름은 프로필에서 필수 항목입니다."
        :error="requiredError.name ? '이름은 필수 항목입니다.' : ''"
        required
      >
        <UInput
          v-model="userProfile.name"
          placeholder="이름을 입력하세요."
          size="xl"
          :maxlength="10"
          @update:model-value="() => (requiredError.name = false)"
        />
      </UFormGroup>

      <UFormGroup label="이메일">
        <UInput
          v-model="userProfile.email"
          placeholder="abc@example.com"
          size="xl"
          disabled
        />
      </UFormGroup>

      <UFormGroup label="직무" help="프로필에 들어갈 포지션을 적어주세요.">
        <UInput
          v-model="userProfile.position"
          placeholder="프론트엔드 개발자"
          size="xl"
          :maxlength="20"
        />
      </UFormGroup>

      <UFormGroup
        label="나를 소개하는 짧은 글"
        help="나를 소개하는 글은 주로 프로필에 대한 상세 항목이 나오기 전 인삿말에 표현됩니다."
      >
        <UTextarea
          v-model="userProfile.intro"
          placeholder="나를 소개하는 짧은 글을 입력하세요."
          size="xl"
          :maxlength="100"
        />
      </UFormGroup>
    </div>
  </ProfileItemBase>
</template>
