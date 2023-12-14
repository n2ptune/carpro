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
