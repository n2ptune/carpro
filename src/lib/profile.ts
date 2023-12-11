import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { getStore } from './store'
import { genUid } from './uid'

// /**
//  * 유저 프로필 제거
//  */
// export function deleteUserProfile(
//   profileUid: string,
//   user: FirebaseUser,
//   form: UserProfile
// ): Promise<boolean>

// /**
//  * 유저 프로필 수정
//  * @todo
//  */
// export function updateUserProfile(
//   profileUid: string,
//   user: FirebaseUser,
//   form: UserProfile
// ): Promise<UserProfile>

/**
 * 유저 프로필 생성
 */
export async function createProfile(user: FirebaseUser): Promise<UserProfile> {
  const store = getStore()
  const profileRef = collection(store, 'profiles')
  const profileUid = genUid()
  const profile: UserProfile = {
    email: user.email || '',
    name: '',
    uid: profileUid,
    userUid: user.uid
  }
  await setDoc(doc(profileRef), profile)
  return await getUserProfile(user)
}

/**
 * 유저 프로필 조회 혹은 프로필 존재 여부
 */
export async function checkOrGetUserProfile<T extends boolean>(
  userUid: string,
  getRaw: T
): Promise<T extends true ? UserProfile | null : boolean>
export async function checkOrGetUserProfile(userUid: string, getRaw = false) {
  const store = getStore()
  const profileRef = collection(store, 'profiles')
  const q = query(profileRef, where('userUid', '==', userUid))
  const qs = await getDocs(q)

  if (!getRaw) return !qs.empty
  return qs.empty ? false : (qs.docs[0].data() as UserProfile)
}

/**
 * 유저 프로필 조회
 */
export async function getUserProfile(user: FirebaseUser) {
  const userProfile = await checkOrGetUserProfile(user.uid, true)
  if (!userProfile) {
    await createProfile(user)
    return getUserProfile(user)
  }
  return userProfile
}
