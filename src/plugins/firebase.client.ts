import { initializeApp, getApps } from 'firebase/app'
import type { FirebaseApp } from 'firebase/app'
import { useFbStore } from '~/store/fb'

export default defineNuxtPlugin((nuxtApp) => {
  let app: FirebaseApp

  if (!getApps().length) {
    const firebaseConfig = {
      apiKey: nuxtApp.$config.public.NUXT_APP_FB_API_KEY,
      authDomain: nuxtApp.$config.public.NUXT_APP_FB_AUTH_DOMAIN,
      projectId: nuxtApp.$config.public.NUXT_APP_FB_PROJECT_ID,
      storageBucket: nuxtApp.$config.public.NUXT_APP_FB_STORAGE_BUCKET,
      messagingSenderId: nuxtApp.$config.public.NUXT_APP_FB_MESSAGING_SENDER_ID,
      appId: nuxtApp.$config.public.NUXT_APP_FB_APP_ID
    }
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }

  nuxtApp.provide('firebaseApp', app)
  nuxtApp.vueApp.provide('firebaseApp', app)

  const fbStore = useFbStore()
  fbStore.$patch({ fbAppLoaded: true })
})
