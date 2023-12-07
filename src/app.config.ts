export default defineAppConfig({
  ui: {
    strategy: 'override',
    primary: 'rose',
    gray: 'neutral',
    icons: {
      dynamic: true
    },
    button: {
      default: {
        loadingIcon: 'i-line-md-loading-loop',
        size: 'md'
      }
    },
    input: {
      default: {
        size: 'md'
      }
    }
  }
})
