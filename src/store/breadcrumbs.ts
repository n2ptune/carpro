interface BreadcrumbsState {
  label: string
  display: boolean
}

export const useBreadcrumbsStore = defineStore('breadcrumbs', {
  state: (): BreadcrumbsState => ({
    label: '',
    display: false
  }),
  getters: {
    canDisplayBreadcrumbs(state) {
      return state.label && state.display
    }
  },
  actions: {
    setBreadcrumbs(label: string, display = true) {
      display = !!label
      this.label = label
      this.display = display
    }
  }
})
