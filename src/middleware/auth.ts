import { useFbStore } from '~/store/fb'
import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return

  const fbStore = useFbStore()
  const userStore = useUserStore()

  if (fbStore.fbAppLoaded && !userStore.authenticating && !userStore.loggedIn) {
    return navigateTo({ name: 'login' })
  }
})
