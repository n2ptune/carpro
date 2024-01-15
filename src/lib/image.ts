import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage'
import { genUid } from './uid'

function getRef(path: string) {
  return ref(getStorage(), path)
}

export async function uploadImage(image: File, prefix = 'images/') {
  const path = prefix + genUid(20)
  const imageRef = getRef(path)
  return await uploadBytes(imageRef, image)
}

export async function image(prefix: string, name: string) {
  const imageRef = getRef(prefix + name)
  return await deleteObject(imageRef)
}
