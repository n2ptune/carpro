<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useFbStore } from '~/store/fb'
import { useUserStore } from '~/store/user'

const { $firebaseApp } = useNuxtApp()
const fbStore = useFbStore()
const userStore = useUserStore()

const onClickAuthButton = () => {
  if (!fbStore.fbAppLoaded) return

  const auth = getAuth($firebaseApp)
  const provider = new GoogleAuthProvider()

  userStore.$patch({
    authenticating: true,
    fbUser: null,
    fbUserCredential: null,
    loggedIn: false,
    user: null
  })

  signInWithPopup(auth, provider)
    .then((credential) => {
      console.log(credential)
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
