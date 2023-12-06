import { defineStore } from 'pinia'
import type { User as FirebaseUser } from 'firebase/auth'

interface UserState {
  fbUser: FirebaseUser | null // Firebase 유저 데이터
  loggedIn: boolean // 로그인 여부
  authenticating: boolean // 인증 진행중 여부
  user: CarProUser | null // 서비스 유저 데이터
}

export interface CarProUser {
  email: string
  uid: string
  photoUrl?: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    fbUser: null,
    loggedIn: false,
    authenticating: false,
    user: null
  })
})
