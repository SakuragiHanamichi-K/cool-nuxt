import type { UserType } from '~~/server/models/User'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | UserType,
  }),
  actions: {
    setUser(data: UserType) {
      this.user = data
    },
    clearUser() {
      this.user = null
    },
  },
  persist: true, // 开启持久化
})
