import { getUserProfile } from '~/lib/profile'
import { useUserStore } from '~/store/user'

export const profileSymbol = Symbol()

export function useUserProfile() {
  const userStore = useUserStore()
  const loading = ref(false)
  const userProfile = ref<UserProfile | null>(null)

  provide(profileSymbol, userProfile)

  watch(
    () => userStore.fbUser,
    (_n, _o) => {
      refresh()
    },
    { immediate: true }
  )

  async function refresh() {
    if (userStore.fbUser) {
      try {
        loading.value = true
        const profile = await getUserProfile(userStore.fbUser)
        userProfile.value = profile
      } catch (err) {
        console.log(err)
      } finally {
        loading.value = false
      }
    }
  }

  return {
    loading,
    userProfile,
    refresh
  }
}
