export const useTemplateStore = defineStore('template', () => {
  const templateData = ref<Template | null>(null)
  const userProfileData = ref<UserProfile | null>(null)
  const isLoadaedData = computed(
    () => templateData.value && userProfileData.value
  )
  const templateTheme = computed(() => {
    if (!templateData.value) return null
    return templateData.value.theme
  })

  const setData = (template: Template, profile: UserProfile) => {
    templateData.value = template
    userProfileData.value = profile
  }

  return {
    isLoadaedData,
    setData,
    templateData,
    templateTheme,
    userProfileData
  }
})
