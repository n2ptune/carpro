import type { FirebaseApp } from 'firebase/app'

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

export {}
