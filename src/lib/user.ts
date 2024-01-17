import { deleteUser, getAuth } from 'firebase/auth'
import { createUser, isExistUserByUid } from './store'

export async function checkInStoreUser(user: FirebaseUser): Promise<boolean> {
  const result = await isExistUserByUid(user.uid)
  if (!result) await pushToStoreUser(user)
  return true
}

export async function pushToStoreUser(user: FirebaseUser): Promise<User> {
  return await createUser(user)
}

export async function deleteMyUser() {
  const nuxtApp = useNuxtApp()
  const auth = getAuth(nuxtApp.$firebaseApp)
  const user = auth.currentUser

  if (!user) throw new Error('Not Authenticated')

  await deleteUser(user)
}
// export async function updateStoreUser(user: User): Promise<User> {}
