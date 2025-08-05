<template>
  <div class="layout-default">
    <div class="header">
      以物换物
      <span @click="handleLogin">登录</span>
    </div>
    <div class="body-container">
      <div class="sidebar">
        <div class="menu" v-for="menu in menus" :key="menu.path">
          {{ menu.name }}
        </div>
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
let menus = [
  { name: '首页', path: '/' },
  { name: '登录', path: '/login' },
  { name: '注册', path: '/register1' },
  { name: '注册', path: '/register2' },
  { name: '注册', path: '/register3' },
  { name: '注册', path: '/register4' },
  { name: '注册', path: '/register5' },
  { name: '注册', path: '/register6' },
  { name: '注册', path: '/register7' },
  { name: '注册', path: '/register8' },
  { name: '注册', path: '/register9' },
  { name: '注册', path: '/register0' },
]
function handleLogin() {
  navigateTo('/auth/login')
}
</script>
<style lang="scss" scoped>
.layout-default {
  width: 100vw;
  height: 100vh;
  .header {
    width: 100%;
    height: 50px;
    background-color: aquamarine;
  }
  .body-container {
    width: 100%;
    height: calc(100vh - 50px);
    display: flex;
    .sidebar {
      width: 400px;
      height: 100%;
      background-color: lightblue;
      display: flex;
      flex-direction: column;
      .menu {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .content {
      width: calc(100% - 400px);
      height: 100%;
      padding: 20px;
      background-color: #f0f0f0;
      overflow-y: auto;
    }
  }
}
</style>
