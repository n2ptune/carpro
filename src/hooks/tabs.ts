const defaultTabs: Tab[] = [
  {
    name: '기본 정보',
    active: true,
    field: 'basic-information',
    icon: 'i-heroicons-document-text'
  },
  {
    name: '경력 사항',
    active: false,
    field: 'work-experience',
    icon: 'i-heroicons-square-3-stack-3d'
  }
  // {
  //   name: '수상 및 활동',
  //   active: false,
  //   field: 'awards',
  //   icon: 'i-heroicons-square-3-stack-3d'
  // }
]

export function useTabs() {
  const tabs = reactive(defaultTabs)
  const activeTab = computed(() => tabs.find((tab) => tab.active) as Tab)

  const onActiveTab = (field: TabField) => {
    tabs.forEach((tab) => (tab.active = false))
    const findTab = tabs.find((tab) => tab.field === field)
    if (findTab) findTab.active = true
  }

  return {
    tabs,
    activeTab,
    onActiveTab
  }
}
