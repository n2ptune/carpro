<script setup lang="ts">
import { useUserStore } from '~/store/user'

definePageMeta({
  layout: 'authentication',
  name: 'login'
})

const userStore = useUserStore()
const { loggedIn, authenticating } = storeToRefs(userStore)
const router = useRouter()

watch(
  () => [loggedIn.value, authenticating.value],
  () => {
    if (loggedIn.value && !authenticating.value) {
      router.push('/')
    }
  },
  { immediate: true }
)
</script>

<template>
  <AuthLoginForm />
</template>
