// 重写 $fetch 客户端请求，添加全局错误处理和登录跳转逻辑 注 使用时只能通过 const { $fetch } = useNuxtApp() 来使用
import LoginModal from '~/components/LoginModal.vue'
const overlay = useOverlay()
import { StatusCodeMap, HttpStatusMap } from '~~/server/utils/codeMap'

export default defineNuxtPlugin(nuxtApp => {
  const rewritingFetch = $fetch.create({
    // ✅ 每个请求发出前操作：比如自动加上 token
    onRequest({ options }) {},

    // ✅ 接口成功返回：不做额外处理
    onResponse({ response }) {
      // 可以在这里做全局成功日志或格式化
    },

    // ✅ 接口失败统一处理：401 跳转登录，其他错误正常抛出
    async onResponseError({ response }) {
      if (response.status === HttpStatusMap[StatusCodeMap.UNAUTHORIZED]) {
        const modal = overlay.create(LoginModal)
        const instance = modal.open()
        const result = await instance.result
        if (result) {
          useToast().add({ title: '登录成功 🎉', color: 'success' })
        } else {
          useToast().add({ title: '登录取消', color: 'neutral' })
        }
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
