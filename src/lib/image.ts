import { getStorage, ref } from 'firebase/storage'
import { genUid } from './uid'

export async function uploadImage(image: File, prefix = 'images/') {
  const storage = getStorage()
  const imageUid = genUid(20)
  const path = prefix + imageUid
  const imageRef = ref(storage, path)

  // imageRef.
}
