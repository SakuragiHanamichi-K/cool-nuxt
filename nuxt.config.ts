// https://nuxt.com/docs/api/configuration/nuxt-config
// 手动加载环境变量
import { config as loadEnv } from 'dotenv'
loadEnv({ path: `.env.${process.env.NODE_ENV}` })
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/scripts', '@nuxt/test-utils', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    // mongodb uri
    mongoUri: process.env.MONGODB_URI,
    // mongodb uri 拼接时后缀
    mongoUriSuffix: process.env.MONGODB_URI_SUFFIX,
    // jwtSecret字符串
    jwtSecret: process.env.JWT_SECRET,
    // 连接数据库表名
    mongoTableName: process.env.MONGO_TABLE_NAME,

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
