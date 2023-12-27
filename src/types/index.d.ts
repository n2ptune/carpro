import type { FirebaseApp } from 'firebase/app'
import type { User as _FirebaseUser } from 'firebase/auth'

declare module '#app' {
  interface NuxtApp {
    $firebaseApp: FirebaseApp
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $firebaseApp: FirebaseApp
  }
}

declare global {
  type FirebaseUser = _FirebaseUser

  interface User {
    email: string
    uid: string
    photoUrl?: string
  }

  interface UserProfile {
    name?: string
    email?: string
    userUid: string
    uid: string
    userPhotoUrl?: string
    templateName?: string
    position?: string
    intro?: string
    workItem?: WorkItem[]
    createdAt: number
    updatedAt?: number | null
    [key: string]: any
  }

  type TemplateType = 'standard' | 'basic'

  type TemplateMeta = {
    uid: string
    supported: boolean // 지원 여부
    name: string
    type: TemplateType
    theme: 'light' | 'dark'
  }

  type TemplateMetaWithRegister = {
    registered: boolean
  } & TemplateMeta

  type Template = {
    uid: string
    userUid: string
    createdAt: number
    isDeleted: boolean
  } & Pick<TemplateMeta, 'type' | 'theme'>

  type WorkItemChild = {
    text: string
  }

  type WorkItem = {
    startDate: number
    endDate?: number
    companyName: string
    isCurrently: boolean
    description: string
    children: WorkItemChild[]
  }
}

export {}
