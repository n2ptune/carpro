import { collection, getDocs, query, where } from 'firebase/firestore'
import { getStore } from './store'

/**
 * 내 템플릿 조회
 */
export async function getUserTemplates(userUid: string): Promise<Template[]> {
  const store = getStore()
  const templateRef = collection(store, 'templates')
  const q = query(templateRef, where('userUid', '==', userUid))
  const qs = await getDocs(q)

  return qs.docs.map((doc) => doc.data() as Template)
}

/**
 * 템플릿 uid로 조회
 */
export async function getTemplate(
  templateUid: string
): Promise<Template | null> {
  const store = getStore()
  const templateRef = collection(store, 'templates')
  const q = query(templateRef, where('uid', '==', templateUid))
  const qs = await getDocs(q)

  if (qs.empty) return null
  return qs.docs[0].data() as Template
}
