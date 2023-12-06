<script setup lang="ts">
import { useFbStore } from '~/store/fb'
import { useUserStore } from '~/store/user'

interface Props {
  disabled: boolean
}

const { fbAppLoaded } = useFbStore()
const { authenticating } = useUserStore()

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
    :color="$colorMode.value === 'light' ? 'white' : 'black'"
    block
    size="xl"
    :trailing="false"
    :disabled="props.disabled || !fbAppLoaded || authenticating"
    @click="onClickAuthButton"
  >
    <Icon name="logos:google-icon" />Continue with Google
  </UButton>
</template>
