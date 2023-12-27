export default defineAppConfig({
  ui: {
    notifications: {
      position: 'top-0 right-0'
    },
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
    },
    skeleton: {
      background: 'bg-gray-200 dark:bg-gray-900'
    },
    card: {
      divide: 'divide-y divide-gray-100 dark:divide-gray-800'
    }
  }
})
