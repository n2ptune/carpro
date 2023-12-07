<script setup lang="ts">
import { useFbStore } from '~/store/fb'
import { useUserStore } from '~/store/user'

const router = useRouter()
const { fbAppLoaded } = useFbStore()
const userStore = useUserStore()

watch(
  () => [fbAppLoaded, userStore.authenticating, userStore.loggedIn],
  (_values, _oldValues) => {
    if (process.server) return

    if (fbAppLoaded && !userStore.authenticating && !userStore.loggedIn) {
      return router.push({ name: 'login' })
    }
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="userStore.authenticating" class="space-y-2">
    <USkeleton class="h-6 w-[280px]" />
    <USkeleton class="h-6 w-[390px]" />
    <USkeleton class="h-6 w-[330px]" />
  </div>
  <!-- Authentication Guard -->
  <slot v-else />
</template>
