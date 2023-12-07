import { useUserStore } from '~/store/user'

export default defineNuxtPlugin((nuxtApp) => {
  const useStore = useUserStore()
  useStore.$patch({ authenticating: true })
})
