<script setup lang="ts">
import { getAuth } from 'firebase/auth'

const { $firebaseApp } = useNuxtApp()
const onClickAuthButton = () => {
  const auth = getAuth($firebaseApp)
  console.log(auth)
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
