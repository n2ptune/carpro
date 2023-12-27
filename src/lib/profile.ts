import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
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

/**
 * 유저 프로필 수정
 */
export async function updateUserProfile(form: UserProfile): Promise<void> {
  const store = getStore()
  const profileRef = collection(store, 'profiles')
  const q = query(profileRef, where('userUid', '==', form.userUid))
  const qs = await getDocs(q)

  if (qs.empty) throw new Error('Not Found User Profile')

  const doc = qs.docs[0]
  const docRef = doc.ref
  const docData = doc.data()

  await updateDoc(docRef, {
    ...docData,
    ...form,
    ...(!docData.createdAt && { createdAt: Date.now() }),
    updatedAt: Date.now()
  })
}

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
    userUid: user.uid,
    userPhotoUrl: '',
    createdAt: Date.now(),
    updatedAt: null
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
