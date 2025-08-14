export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | { username: string; password: string; nickname: string; avatar: string },
  }),
  actions: {
    setUser(data: { username: string; password: string; nickname: string; avatar: string }) {
      this.user = data
    },
    clearUser() {
      this.user = null
    },
  },
  persist: true, // 开启持久化
})
