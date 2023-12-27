import { getUserProfile, updateUserProfile } from '~/lib/profile'
import { useUserStore } from '~/store/user'

export const profileSymbol = Symbol()

export function useUserProfile() {
  const userStore = useUserStore()
  const loading = ref(false)
  const updating = ref(false)
  const userProfile = ref<UserProfile | null>(null)
  const toast = useToast()

  provide(profileSymbol, userProfile)

  watch(
    () => userStore.fbUser,
    (_n, _o) => {
      refresh()
    },
    { immediate: true }
  )

  async function refresh(withoutLoading = false) {
    if (userStore.fbUser) {
      try {
        if (!withoutLoading) loading.value = true
        const profile = await getUserProfile(userStore.fbUser)
        userProfile.value = profile
      } catch (err) {
        console.log(err)
      } finally {
        if (!withoutLoading) loading.value = false
      }
    }
  }

  async function updateProfile() {
    if (!userProfile.value) return

    try {
      updating.value = true
      await updateUserProfile(userProfile.value)
      await refresh(true)
      toast.add({ title: '알림', description: '프로필을 저장하였습니다.' })
    } catch (error) {
      console.error(error)
      toast.add({ title: '알림', description: '프로필 수정에 실패하였습니다.' })
    } finally {
      updating.value = false
    }
  }

  return {
    loading,
    updating,
    userProfile,
    refresh,
    updateProfile
  }
}
