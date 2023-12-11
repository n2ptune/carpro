type TabField = 'basic-information' | 'work-experience'

type Tab = {
  name: string
  active: boolean
  field: TabField
}

const defaultTabs: Tab[] = [
  {
    name: '기본 정보',
    active: true,
    field: 'basic-information'
  },
  {
    name: '기본 정보',
    active: false,
    field: 'work-experience'
  }
]

export function useTabs() {
  const tabs = reactive(defaultTabs)
  const activeTab = computed(() => tabs.find((tab) => tab.active))

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