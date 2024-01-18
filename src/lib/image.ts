import {
  deleteObject,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import { genUid } from './uid'

function getRef(path: string) {
  return ref(getStorage(), path)
}

/**
 * 이미지 업로드하는 함수
 * 업로드 상태를 관찰할 수 있는 객체를 리턴하고,
 * 에러 캐치 및 업로드 상황에 대한 관찰, 성공 상태에 대한 리턴 여부를
 * 사용하는 측에서 자유롭게 사용할 수 있도록 관찰 가능한 객체를 직접 리턴
 */
export function getUploadImageTask(image: File, prefix = 'images/') {
  const path = prefix + genUid(20)
  const imageRef = getRef(path)
  return uploadBytesResumable(imageRef, image)
}

export async function deleteImage(prefix: string, name: string) {
  const imageRef = getRef(prefix + name)
  return await deleteObject(imageRef)
}
