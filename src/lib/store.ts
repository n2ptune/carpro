import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import type { FirebaseApp } from 'firebase/app'
import { useNuxtApp } from 'nuxt/app'

/**
 * @public
 */
export function getStore() {
  const nuxtApp = useNuxtApp()
  return getFirestore(nuxtApp.$firebaseApp as FirebaseApp)
}

/**
 * @private
 */
async function getUser(content: string, type: 'uid' | 'email') {
  const store = getStore()
  const userRef = collection(store, 'users')
  const q = query(userRef, where(type, '==', content))
  const qs = await getDocs(q)

  if (qs.empty) {
    return null
  } else {
    return qs.docs[0].data()
  }
}

export async function isExistUserByUid(uid: string) {
  const store = getStore()
  const userRef = collection(store, 'users')
  const q = query(userRef, where('uid', '==', uid))
  const qs = await getDocs(q)

  return !qs.empty
}

export async function getUserByUid(uid: string) {
  return getUser(uid, 'uid')
}

export async function getUserByEmail(email: string) {
  return getUser(email, 'email')
}

export async function createUser(user: FirebaseUser) {
  const creatingUser: User = {
    email: user.email || '',
    uid: user.uid,
    photoUrl: user.photoURL || ''
  }
  const store = getStore()
  const userRef = collection(store, 'users')
  await setDoc(doc(userRef), creatingUser)
  return creatingUser
}
