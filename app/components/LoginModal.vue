<script setup lang="ts">
// type
import { UserZodSchema, type UserType } from '~~/server/models/User'
// plugins
const { $fetch } = useNuxtApp()
const userStore = useUserStore()
// variables
const loading = ref<boolean>(false)
const username = ref<UserType['username']>('')
const password = ref<UserType['password']>('')
const errorMsg = ref<string>('')

// methods
const emit = defineEmits<{ close: any }>()
async function handleLogin() {
  const result = UserZodSchema.safeParse({ username: username.value, password: password.value })
  if (!result.success) {
    errorMsg.value = result.error?.issues?.[0]?.message ?? ''
    return
  }
  loading.value = true
  errorMsg.value = ''
  await $fetch('/api/public/auth/login-auto-register', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
    },
  })
    .then(res => {
      userStore.setUser(res.data)
      emit('close', res)
      location.reload()
    })
    .catch(err => {
      errorMsg.value = err.message || '登录失败，请稍后再试'
      console.error('Login error:', err)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <UModal title="登录" @close="emit('close', null)" transition>
    <template #body>
      <div class="flex flex-col gap-4">
        <input v-model="username" placeholder="账号" class="border p-2 rounded" />
        <input type="password" v-model="password" placeholder="密码" class="border p-2 rounded" />
        <p v-show="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton label="取消" @click="emit('close', false)" />
        <UButton :loading="loading" label="登录" color="primary" @click="handleLogin" />
      </div>
    </template>
  </UModal>
</template>
