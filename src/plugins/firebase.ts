import { initializeApp, getApps } from 'firebase/app'
import type { FirebaseApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useFbStore } from '~/store/fb'
import { useUserStore } from '~/store/user'
import { checkInStoreUser } from '~/lib/user'

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
  const userStore = useUserStore()
  const auth = getAuth(app)
  fbStore.$patch({ fbAppLoaded: true })

  onAuthStateChanged(auth, (user) => {
    // console.log('onAuthStateChanged', user)
    // 서버사이드 인증 불필요
    if (process.server) return
    // 인증 정보 삭제된 경우 유저 스토어 초기화
    // 로컬 스토리지에 있는 인증 대기 상태도 초기화
    if (!user) {
      userStore.$reset()
      localStorage.removeItem('fb_auth_waiting')
      return
    }
    // 인증 정보 유저 스토어에 저장하고 로컬 스토리지에 인증 대기 상태 추가
    userStore.$patch({
      authenticating: false,
      loggedIn: true,
      fbUser: user,
      user: {
        email: user.email || '',
        photoUrl: user.photoURL || '',
        uid: user.uid
      }
    })
    localStorage.setItem('fb_auth_waiting', '1')

    checkInStoreUser(user)
  })
})
