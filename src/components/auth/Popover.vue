<script lang="ts" setup>
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const { loggedIn, authenticating } = storeToRefs(userStore)
const router = useRouter()

function onClickRouteToLogin() {
  return router.push({ name: 'login' })
}

function onClickRouteToMyPage() {
  return router.push({ name: 'my-page' })
}
</script>

<template>
  <UChip :show="loggedIn">
    <UButton
      icon="i-heroicons-user-circle"
      sqaure
      :padded="false"
      variant="ghost"
      color="gray"
      @click="
        !loggedIn && !authenticating
          ? onClickRouteToLogin()
          : onClickRouteToMyPage()
      "
    />
  </UChip>
</template>
