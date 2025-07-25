import { defineAppConfig } from 'nuxt/app'

export default defineAppConfig({
  nuxtLoadingIndicator: {
    name: 'bar', // 样式：bar、circle、dots、pulse、default
    color: '#00dc82', // 自定义颜色
    throttle: 100, // 延迟出现的时间（ms）
    height: '10px', // 只对 bar 类型有效
  },
})
