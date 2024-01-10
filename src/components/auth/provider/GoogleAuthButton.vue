<script setup lang="ts">
import { useFbStore } from '~/store/fb'
import { useUserStore } from '~/store/user'

interface Props {
  disabled: boolean
}

const fbStore = useFbStore()
const userStore = useUserStore()
const { authenticating } = storeToRefs(userStore)

const emit = defineEmits<{
  click: []
}>()
const props = defineProps<Props>()

const onClickAuthButton = () => {
  if (props.disabled) return
  emit('click')
}
</script>

<template>
  <UButton
    :loading="authenticating"
    :color="$colorMode.value === 'light' ? 'white' : 'black'"
    block
    size="xl"
    :trailing="false"
    :disabled="props.disabled || !fbStore.fbAppLoaded || authenticating"
    @click="onClickAuthButton"
  >
    <Icon name="logos:google-icon" />
    Continue with Google
  </UButton>
</template>
