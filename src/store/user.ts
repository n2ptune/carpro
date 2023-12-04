import { defineStore } from 'pinia'
import type { User as FirebaseUser, UserCredential as FirebaseUserCredential } from 'firebase/auth'

interface UserState {
  user: FirebaseUser | null
  userCredential: FirebaseUserCredential | null
  loggedIn: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    userCredential: null,
    loggedIn: false
  })
})