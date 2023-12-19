import type { NuxtError } from 'nuxt/app'
import { getUserTemplates, getTemplate as getLibTemplate } from '~/lib/template'
import { useUserStore } from '~/store/user'

interface TemplateHook {
  templates: TemplateMeta[]
  isLoadingTemplate: Ref<boolean>
  templateData: Ref<Template | null>
}

interface MyTemplateHook {
  myTemplates: Ref<Template[]>
  isLoadingMyTemplate: Ref<boolean>
  refresh: () => Promise<void>
}

const templates: TemplateMeta[] = [
  {
    name: 'Standard Light',
    supported: true,
    theme: 'light',
    type: 'standard'
  },
  {
    name: 'Standard Dark',
    supported: true,
    theme: 'dark',
    type: 'standard'
  },
  {
    name: 'Basic Light',
    supported: false,
    theme: 'light',
    type: 'basic'
  },
  {
    name: 'Basic Dark',
    supported: false,
    theme: 'dark',
    type: 'basic'
  }
]

// export function useTemplate(): TemplateHook {
//   const route = useRoute()
//   const router = useRouter()
//   const isLoadingTemplate = ref(false)
//   const templateData = ref<Template | null>(null)
//   const toast = useToast()

//   if (!route.params.slug) {
//     router.replace({ name: 'Error' })
//     return { isLoadingTemplate, templates, templateData }
//   }

//   async function getTemplate() {
//     clearError()
//     isLoadingTemplate.value = true

//     try {
//       const template = await getLibTemplate(route.params.slug as string)
//       templateData.value = template
//       if (!templateData.value)
//         createError({
//           statusCode: 404,
//           message: '템플릿이 없습니다.',
//           fatal: true
//         })
//     } catch (apiError) {
//       console.log(apiError)
//       toast.add({ title: '알림', description: '템플릿 조회에 실패하였습니다.' })
//       throw createError({
//         message: '템플릿 조회에 실패하였습니다.',
//         statusCode: 500
//       })
//     } finally {
//       isLoadingTemplate.value = false
//     }
//   }

//   getTemplate()

//   return {
//     templates,
//     isLoadingTemplate,
//     templateData
//   }
// }

export function useMyTemplate(): MyTemplateHook {
  const toast = useToast()
  const isLoadingMyTemplate = ref(false)
  const myTemplates = ref<Template[]>([])
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  async function getMyTemplates() {
    if (!user.value) return

    isLoadingMyTemplate.value = true

    try {
      const templates = await getUserTemplates(user.value.uid)
      myTemplates.value = templates
    } catch (error) {
      console.log(error)
      toast.add({ title: '알림', description: '템플릿 조회에 실패하였습니다.' })
    } finally {
      isLoadingMyTemplate.value = false
    }
  }

  getMyTemplates()

  return {
    isLoadingMyTemplate,
    myTemplates,
    refresh: getMyTemplates
  }
}
