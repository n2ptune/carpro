<script lang="ts" setup>
import { signOut } from '~/lib/auth'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const { loggedIn, authenticating } = storeToRefs(userStore)
const router = useRouter()

const onClickRouteToLogin = () => {
  return router.push({ name: 'login' })
}

const onClickRouteToMyPage = () => {
  return router.push({ name: 'my-page' })
}

const profileOptions = computed(() => {
  return loggedIn.value && !authenticating.value
    ? [
        [
          {
            label: '프로필 관리',
            icon: 'i-heroicons-briefcase',
            click: onClickRouteToMyPage
          }
        ],
        [
          {
            label: '로그아웃',
            icon: 'i-heroicons-arrow-left-start-on-rectangle',
            click: signOut
          }
        ]
      ]
    : []
})

const onClickDropdown = () => {
  if (!loggedIn.value && !authenticating.value) {
    return onClickRouteToLogin()
  }
}
</script>

<template>
  <UDropdown
    :items="profileOptions"
    @click="onClickDropdown"
    :popper="{ placement: 'bottom' }"
  >
    <UChip :show="loggedIn">
      <UButton
        icon="i-heroicons-user-circle"
        sqaure
        size="xl"
        :padded="false"
        variant="ghost"
        color="gray"
      />
    </UChip>
  </UDropdown>
</template>
