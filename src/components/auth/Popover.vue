<script lang="ts" setup>
import { useUserStore } from '~/store/user'

const { loggedIn, authenticating } = useUserStore()
const router = useRouter()

function onClickRouteToLogin() {
  return router.push({ path: '/login' })
}

function onClickRouteToMyPage() {
  return router.push({ path: '/my' })
}
</script>

<template>
  <UButton
    icon="i-heroicons-user-circle"
    sqaure
    size="md"
    variant="link"
    color="black"
    @click="
      !loggedIn && !authenticating
        ? onClickRouteToLogin()
        : onClickRouteToMyPage()
    "
  />
</template>
