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

export async function useTemplate(): Promise<TemplateHook> {
  const route = useRoute()
  const isLoadingTemplate = ref(false)
  const templateData = ref<Template | null>(null)

  if (!route.params.slug) {
    throw createError({
      fatal: true,
      message: '템플릿이 존재하지 않습니다.',
      statusCode: 400
    })
  }

  async function getTemplate() {
    clearError()
    isLoadingTemplate.value = true

    try {
      const template = await getLibTemplate(route.params.slug as string)
      if (!template) {
        throw new Error('not-found')
      }
      return template
    } catch (apiError: any) {
      console.log(apiError)
      if (apiError?.message === 'not-found') {
        throw createError({
          message: '템플릿이 존재하지 않습니다.',
          statusCode: 404,
          fatal: true
        })
      } else {
        throw createError({
          message: '템플릿 조회에 실패하였습니다.',
          statusCode: 500,
          fatal: true
        })
      }
    } finally {
      isLoadingTemplate.value = false
    }
  }

  const { error, data } = await useAsyncData(async () => {
    try {
      const result = await getTemplate()
      return result
    } catch (error: any) {
      showError(error)
    }
  })

  if (error.value) {
    throw createError({
      statusCode: 404,
      message: '템플릿이 존재하지 않습니다.'
    })
  }

  if (data.value) {
    templateData.value = data.value
  }

  return {
    templates,
    isLoadingTemplate,
    templateData
  }
}

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
