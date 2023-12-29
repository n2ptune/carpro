import { createUser, isExistUserByUid } from './store'

export async function checkInStoreUser(user: FirebaseUser): Promise<boolean> {
  const result = await isExistUserByUid(user.uid)
  if (!result) await pushToStoreUser(user)
  return true
}
export async function pushToStoreUser(user: FirebaseUser): Promise<User> {
  return await createUser(user)
}
// export async function deleteStoreUser(user: User): Promise<boolean> {}
// export async function updateStoreUser(user: User): Promise<User> {}
