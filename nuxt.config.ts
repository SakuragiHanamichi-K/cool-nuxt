// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/image', '@nuxt/scripts', '@nuxt/test-utils', '@nuxt/ui'],
  runtimeConfig: {
    public: {
      appName: process.env.NUXT_HUB_PROJECT_NAME,
      env: process.env.NUXT_HUB_ENV,
    },
  },
  devServer: {
    port: 1415,
  },
})
