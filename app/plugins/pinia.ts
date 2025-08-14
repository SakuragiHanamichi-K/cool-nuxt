import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(nuxtApp => {
  const pinia = usePinia() // 官方方法获取 Pinia 实例
  if (!import.meta.env.SSR) {
    pinia.use(piniaPluginPersistedstate)
  }
})
