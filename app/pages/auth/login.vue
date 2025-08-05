<template>
  <UPage>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <UCard class="w-full max-w-md shadow-xl">
        <template #header>
          <h2 class="text-xl font-bold text-center">登录 / 注册</h2>
        </template>

        <form @submit.prevent="handleSubmit">
          <UFormField label="用户名" name="username">
            <UInput v-model="form.username" placeholder="请输入用户名" required />
          </UFormField>

          <UFormField label="密码" name="password" class="mt-4">
            <UInput v-model="form.password" type="password" placeholder="请输入密码" required />
          </UFormField>

          <div class="mt-6">
            <UButton :loading="loading" type="submit" color="primary" block>登录 / 注册</UButton>
          </div>
        </form>

        <template #footer>
          <p class="text-xs text-center text-gray-500">未注册用户将自动注册并登录</p>
        </template>
      </UCard>
    </div>
    <UPageBody />
  </UPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login',
})
const loading = ref(false)
const form = reactive({
  username: '',
  password: '',
})
async function handleSubmit() {
  loading.value = true
  await $fetch('/api/auth/login-auto-register', {
    method: 'POST',
    body: form,
  })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log('err', err)
    })
    .finally(() => {
      loading.value = false
    })
  // try {
  //   const res = await $fetch('/api/auth/login-auto-register', {
  //     method: 'POST',
  //     body: form,
  //   })
  //   console.log(res)

  //   navigateTo('/')
  // } catch (err: any) {
  //   console.log('err', err)
  //   alert(err?.data?.message || '请求失败')
  // } finally {
  //   loading.value = false
  // }
}
</script>
