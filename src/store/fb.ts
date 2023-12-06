interface FbState {
  fbAppLoaded: boolean // Firebase App 로딩 여부
}

export const useFbStore = defineStore('fb', {
  state: (): FbState => ({
    fbAppLoaded: false
  })
})
