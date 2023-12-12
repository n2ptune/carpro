import type { FirebaseApp } from 'firebase/app'
import type { User as _FirebaseUser } from 'firebase/auth'

declare module '#app' {
  interface NuxtApp {
    $firebaseApp: FirebaseApp
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $firebaseApp: FirebaseApp
  }
}

declare global {
  type FirebaseUser = _FirebaseUser

  interface User {
    email: string
    uid: string
    photoUrl?: string
  }

  interface UserProfile {
    name?: string
    email?: string
    userUid: string
    uid: string
    userPhotoUrl?: string
    templateName?: string
    position?: string
    intro?: string
    [key: string]: any
  }
}

export {}
