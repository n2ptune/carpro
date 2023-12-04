import { initializeApp, getApps } from 'firebase/app'
import type { FirebaseApp } from 'firebase/app'

export default defineNuxtPlugin((nuxtApp) => {
  let app: FirebaseApp

  if (!getApps().length) {
    const firebaseConfig = {
      apiKey: process.env.NUXT_APP_FB_API_KEY,
      authDomain: process.env.NUXT_APP_FB_AUTH_DOMAIN,
      projectId: process.env.NUXT_APP_FB_PROJECT_ID,
      storageBucket: process.env.NUXT_APP_FB_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_APP_FB_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_APP_FB_APP_ID
    }
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }

  nuxtApp.provide('firebaseApp', app)
  nuxtApp.vueApp.provide('firebaseApp', app)
})
