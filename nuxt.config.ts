// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/base.css'],
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui', 'dayjs-nuxt'],
  runtimeConfig: {
    public: {
      NUXT_APP_FB_API_KEY: process.env.NUXT_APP_FB_API_KEY,
      NUXT_APP_FB_AUTH_DOMAIN: process.env.NUXT_APP_FB_AUTH_DOMAIN,
      NUXT_APP_FB_PROJECT_ID: process.env.NUXT_APP_FB_PROJECT_ID,
      NUXT_APP_FB_STORAGE_BUCKET: process.env.NUXT_APP_FB_STORAGE_BUCKET,
      NUXT_APP_FB_MESSAGING_SENDER_ID:
        process.env.NUXT_APP_FB_MESSAGING_SENDER_ID,
      NUXT_APP_FB_APP_ID: process.env.NUXT_APP_FB_APP_ID
    }
  },
  srcDir: 'src/',
  tailwindcss: {},
  dayjs: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
    defaultTimezone: 'Asia/Seoul',
    plugins: ['timezone', 'relativeTime']
  }
})
