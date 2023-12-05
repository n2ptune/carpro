<script lang="ts" setup>
import { useUserStore } from '~/store/user'

const { loggedIn, authenticating } = useUserStore()
const router = useRouter()

function onClickRouteToLogin() {
  return router.push({ path: '/login' })
}
</script>

<template>
  <UButton
    v-if="!loggedIn && !authenticating"
    icon="i-heroicons-user-circle"
    sqaure
    size="md"
    variant="link"
    color="black"
    @click="onClickRouteToLogin"
  />
</template>
