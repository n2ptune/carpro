import { getAuth, signOut as sdkSignOut } from 'firebase/auth'

export function signOut() {
  return sdkSignOut(getAuth(useNuxtApp().$firebaseApp))
}
