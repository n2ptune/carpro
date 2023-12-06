<script setup lang="ts">
import { useUserStore } from '~/store/user'

definePageMeta({
  layout: 'authentication'
})

const { loggedIn, authenticating } = useUserStore()
const router = useRouter()

watch(
  () => [loggedIn, authenticating],
  (n, o) => {
    if (loggedIn && !authenticating) {
      router.push('/')
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <AuthLoginForm />
</template>
