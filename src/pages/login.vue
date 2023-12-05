<script setup lang="ts">
import { useUserStore } from '~/store/user'

definePageMeta({
  layout: 'default'
})

const { loggedIn, authenticating } = useUserStore()
const router = useRouter()

watch(
  () => [loggedIn, authenticating],
  (n, o) => {
    if (loggedIn && authenticating) {
      router.push('/')
    }
  }
)
</script>

<template>
  <div>Login Form</div>
</template>
