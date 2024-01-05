<script setup lang="ts">
import { profileSymbol } from '~/hooks/profiles'

interface Props {
  tab: Tab
}

const defaultAwardsItem: Awards = {
  description: '',
  name: '',
  type: 'awards',
  awardsDate: undefined,
  endDate: undefined,
  isActivating: false,
  startDate: undefined,
  where: undefined
}

defineProps<Props>()
const userProfile = inject<Ref<UserProfile>>(profileSymbol) as Ref<UserProfile>

const onClickAddAwards = () => {
  if (!userProfile.value.awards) userProfile.value.awards = []
  userProfile.value.awards = [...userProfile.value.awards, defaultAwardsItem]
}

const validateForm = () => {
  return true
}

defineExpose({
  validateForm
})
</script>

<template>
  <ProfileItemBase :label="$props.tab.name">
    <UFormGroup label="수상 및 활동 정보">
      <div class="space-y-4 mb-4 py-4">
        <div v-for="item in userProfile.awards || []">
          {{ item }}
        </div>
      </div>
    </UFormGroup>

    <UButton
      leading-icon="i-heroicons-plus-solid"
      size="lg"
      block
      color="gray"
      @click="onClickAddAwards"
    >
      수상 및 활동 추가하기
    </UButton>
  </ProfileItemBase>
</template>
