<template>
  <div>
    <h1>Welcome to the homepage</h1>
    This is an auto-imported component
    <NuxtLink to="/about">去 About 页</NuxtLink>
  </div>
</template>
<script setup lang="ts">
// const runtimeConfig = useRuntimeConfig()
// console.log(runtimeConfig)

async function register() {
  try {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username: 'yankun',
        password: '261304',
      },
    })
    console.log('res', res)
  } catch (err) {
    console.error('获取用户失败', err)
  }
}
async function login() {
  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: 'yankun',
        password: '261304',
      },
    })
    console.log('res', res)
  } catch (err) {
    console.error('获取用户失败', err)
  }
}
onMounted(() => {
  // register()
  login()
})
</script>
