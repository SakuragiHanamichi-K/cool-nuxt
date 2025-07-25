// https://nuxt.com/docs/api/configuration/nuxt-config
// 手动加载环境变量
import { config as loadEnv } from 'dotenv'
loadEnv({ path: `.env.${process.env.NODE_ENV}` })

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/image', '@nuxt/scripts', '@nuxt/test-utils', '@nuxt/ui'],
  runtimeConfig: {
    public: {
      appName: process.env.NUXT_PUBLIC_PROJECT_NAME,
    },
  },
  devServer: {
    port: 1415,
  },
  $production: {},
  $development: {},
  $env: {
    staging: {
      //
    },
  },
})
