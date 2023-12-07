<script lang="ts" setup>
import { useUserStore } from '~/store/user'

const { loggedIn, authenticating } = useUserStore()
const router = useRouter()

function onClickRouteToLogin() {
  return router.push({ name: 'login' })
}

function onClickRouteToMyPage() {
  return router.push({ name: 'my-page' })
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
