import type { LayoutKey } from '#build/types/layouts'
import { checkOrGetUserProfile } from '~/lib/profile'
import { getTemplate } from '~/lib/template'
import { useTemplateStore } from '~/store/template'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const templateStore = useTemplateStore()
  const slug = to.params.slug as string

  const setLayout = (metaUid: string) => {
    if (process.server) return

    const layoutMap = {
      '1': 'standard',
      '2': 'standard'
    }[metaUid]

    if (!layoutMap) return

    setPageLayout(layoutMap as LayoutKey)
  }

  const setTheme = async (template: Template) => {
    if (typeof window !== 'undefined' && document && document.documentElement) {
      /**
       * HTML Element의 클래스를 강제로 조작하는 타이밍을
       * tailwind darkMode 속성이 지정되고 난 뒤로 지연시킴
       */
      setTimeout(() => {
        document.documentElement.classList.add(
          template.theme === 'light' ? 'light' : 'dark'
        )
        document.documentElement.classList.remove(
          template.theme === 'light' ? 'dark' : 'light'
        )
      }, 0)
    }
  }

  try {
    const template = await getTemplate(slug)

    if (!template)
      return createError({
        message: '템플릿이 존재하지 않습니다.',
        statusCode: 404,
        fatal: true
      })

    const userProfile = await checkOrGetUserProfile(template.userUid, true)

    if (!userProfile)
      return createError({
        message: '프로필이 존재하지 않습니다.',
        statusCode: 404,
        fatal: true
      })

    templateStore.setData(template, userProfile)
    setTheme(template)
    setLayout(template.metaUid)
  } catch (error: any) {
    console.log(error)
    if (error?.message === 'not-found') {
      return createError({
        message: '템플릿 혹은 프로필이 존재하지 않습니다.',
        statusCode: 404,
        fatal: true
      })
    } else {
      return createError({
        message: '템플릿을 조회할 수 없습니다. 잠시 후 다시 시도해주세요.',
        statusCode: 500,
        fatal: true
      })
    }
  }
})
