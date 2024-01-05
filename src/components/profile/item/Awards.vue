<script setup lang="ts">
import { profileSymbol } from '~/hooks/profiles'

interface Props {
  tab: Tab
}

defineProps<Props>()
const userProfile = inject<Ref<UserProfile>>(profileSymbol) as Ref<UserProfile>

const validateForm = () => {
  return true
}

defineExpose({
  validateForm
})
</script>

<template>
  <ProfileItemBase :label="$props.tab.name"> </ProfileItemBase>
</template>
