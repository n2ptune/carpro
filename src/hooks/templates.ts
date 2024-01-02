import { getUserTemplates, createTemplate } from '~/lib/template'
import { useUserStore } from '~/store/user'

interface MyTemplateHook {
  myTemplates: Ref<Template[]>
  isLoadingMyTemplate: Ref<boolean>
  refresh: () => Promise<void>
  registerTemplate: (t: TemplateMetaWithRegister) => Promise<void>
}

export const templates: TemplateMeta[] = [
  {
    uid: '1',
    name: 'Standard Light',
    supported: true,
    theme: 'light',
    type: 'standard'
  },
  {
    uid: '2',
    name: 'Standard Dark',
    supported: true,
    theme: 'dark',
    type: 'standard'
  },
  {
    uid: '3',
    name: 'Basic Light',
    supported: false,
    theme: 'light',
    type: 'basic'
  },
  {
    uid: '4',
    name: 'Basic Dark',
    supported: false,
    theme: 'dark',
    type: 'basic'
  }
]

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

  function registerTemplate(template: TemplateMetaWithRegister) {
    return createTemplate(user.value?.uid as string, template)
  }

  getMyTemplates()

  return {
    isLoadingMyTemplate,
    myTemplates,
    refresh: getMyTemplates,
    registerTemplate
  }
}
