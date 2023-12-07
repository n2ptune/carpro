<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useFbStore } from '~/store/fb'
import { useUserStore } from '~/store/user'

const { $firebaseApp } = useNuxtApp()
const fbStore = useFbStore()
const userStore = useUserStore()
const router = useRouter()

const onClickAuthButton = () => {
  if (!fbStore.fbAppLoaded) return
  if (userStore.loggedIn) return

  const auth = getAuth($firebaseApp)
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
    .then((_) => {
      router.push({ name: 'my-page' })
    })
    .catch((err) => {
      console.log(err)
      userStore.$patch({ authenticating: false })
    })
}
</script>

<template>
  <ClientOnly>
    <Suspense>
      <AuthProviderGoogleAuthButton
        :disabled="false"
        @click="onClickAuthButton"
      />
    </Suspense>
    <template #placeholder>
      <AuthProviderGoogleAuthButton disabled />
    </template>
  </ClientOnly>
</template>
