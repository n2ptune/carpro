import { defineStore } from 'pinia'

interface UserState {
  fbUser: FirebaseUser | null // Firebase 유저 데이터
  loggedIn: boolean // 로그인 여부
  authenticating: boolean // 인증 진행중 여부
  user: User | null // 서비스 유저 데이터
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    fbUser: null,
    loggedIn: false,
    authenticating: false,
    user: null
  })
})
