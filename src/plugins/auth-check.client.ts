import { useUserStore } from '~/store/user'

export default defineNuxtPlugin((nuxtApp) => {
  const userStore = useUserStore()
  // 로컬 스토리지에 인증 대기 상태 존재할 경우 스토어 값 갱신
  if (localStorage.getItem('fb_auth_waiting')) {
    userStore.$patch({ authenticating: true })
  }
})
