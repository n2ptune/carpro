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
  /**
   * Domain types
   */
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
    awards?: Awards[]
    certificates?: Certificate[]
    [key: string]: any
  }

  type TemplateType = 'standard' | 'basic'

  interface TemplateMeta {
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
    metaUid: string
  } & Pick<TemplateMeta, 'type' | 'theme'>

  type WorkItemChild = {
    text: string
  }

  interface WorkItem {
    startDate?: number
    endDate?: number
    position?: string
    companyName: string
    isCurrently: boolean
    description: string
    children: WorkItemChild[]
  }

  type TabField =
    | 'basic-information' // 기본 정보
    | 'work-experience' // 경력 사항
    | 'awards' // 수상 및 활동
    | 'certificate' // 자격증
    | 'education' // 학력
    | 'language' // 외국어
    | 'project' // 프로젝트

  interface Tab {
    name: string
    active: boolean
    field: TabField
    icon: string
  }

  interface Awards {
    type: AwardsType
    name: string // 수상 및 활동 이름
    where: string // 소속
    isActivating: boolean // 활동중 여부
    startDate?: number | null // 활동 시작 기간 (type: activity, awards)
    endDate?: number | null // 활동 종료 기간 (type: activity)
    description: string // 수상 및 활동 내용
    url?: string // 참고 URL
  }

  type AwardsType = 'awards' | 'activity'

  interface Certificate {
    name: string // 자격증 이름
    where: string // 발급 기관
    date: number // 취득일자
    description?: string // 비고
  }

  /*******************************/
  /*******************************/
  /*******************************/

  /**
   * Custom utility types
   */
  type Nullable<T> = T extends number
    ? T | null // 더 확장해야 하는디.. 귀찮..
    : { [P in keyof T]: T[P] | null }
}

export {}
