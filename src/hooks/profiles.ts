import { getUserProfile } from '~/lib/profile'
import { useUserStore } from '~/store/user'

export function useUserProfile() {
  const userStore = useUserStore()
  const loading = ref(false)
  const userProfile = ref<UserProfile | null>(null)

  watch(
    () => userStore.fbUser,
    async (_n, _o) => {
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
    },
    { immediate: true }
  )

  return {
    loading,
    userProfile
  }
}
