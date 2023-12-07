import type { User as FirebaseUser } from 'firebase/auth'
import type { CarProUser } from '../store/user'
import { createUser, isExistUserByUid } from './store'

export async function checkInStoreUser(user: FirebaseUser): Promise<boolean> {
  const result = await isExistUserByUid(user.uid)
  if (!result) await pushToStoreUser(user)
  return true
}
export async function pushToStoreUser(user: FirebaseUser): Promise<CarProUser> {
  return await createUser(user)
}
export async function deleteStoreUser(user: CarProUser): Promise<boolean> {}
export async function updateStoreUser(user: CarProUser): Promise<CarProUser> {}
