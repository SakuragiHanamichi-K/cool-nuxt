import { StatusCodeMap, HttpStatusMap } from '~~/server/utils/codeMap'

export default defineNuxtPlugin(nuxtApp => {
  const rewritingFetch = $fetch.create({
    // ✅ 每个请求发出前：自动加上 token
    onRequest({ options }) {},

    // ✅ 接口成功返回：不做额外处理
    onResponse({ response }) {
      // 可以在这里做全局成功日志或格式化
    },

    // ✅ 接口失败统一处理：401 跳转登录，其他错误正常抛出
    onResponseError({ response }) {
      if (response.status === HttpStatusMap[StatusCodeMap.UNAUTHORIZED]) {
        const currentPath = useRoute().fullPath
        navigateTo(`/auth/login?redirect=${encodeURIComponent(currentPath)}`)
      }

      // 其他错误保留，继续抛给业务代码处理
      throw response._data || new Error('请求失败')
    },
  })

  // 提供全局 $fetch
  return {
    provide: {
      fetch: rewritingFetch,
    },
  }
})
