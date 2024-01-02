export const useTemplateStore = defineStore('template', () => {
  const templateData = ref<Template | null>(null)
  const userProfileData = ref<UserProfile | null>(null)
  const isLoadaedData = computed(
    () => templateData.value && userProfileData.value
  )

  const setData = (template: Template, profile: UserProfile) => {
    templateData.value = template
    userProfileData.value = profile
  }

  return {
    templateData,
    userProfileData,
    isLoadaedData,
    setData
  }
})
