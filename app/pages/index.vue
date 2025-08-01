<template>
  <div>
    <div class="top">
      <div class="top-left"></div>
      <div class="top-right"></div>
    </div>
    <div class="bottom">
      <div class="tab-wrapper">
        <div>星系</div>
        <div>星球</div>
        <div>家园</div>
      </div>
      <div class="bottom-content">
        <div
          class="content-item"
          v-for="(item, index) in contentList"
          :key="item.id"
          :style="{
            marginLeft: index % itemsPerRow !== 0 ? '10px' : '0',
            marginTop: index >= itemsPerRow ? '10px' : '0',
          }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// const runtimeConfig = useRuntimeConfig()
// console.log(runtimeConfig)
const contentList = reactive([
  { id: 1, name: '家电' },
  { id: 2, name: '手机' },
  { id: 3, name: '裤子' },
  { id: 4, name: '衣服' },
  { id: 5, name: '手机' },
  { id: 6, name: '耳机' },
  { id: 7, name: '床铺' },
  { id: 8, name: '家庭' },
  { id: 9, name: '内衣' },
  { id: 10, name: '袜子' },
])
const itemsPerRow = 5
const itemsReduction = ((itemsPerRow - 1) * 10) / itemsPerRow + 'px'
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
  // login()
})
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  .top-left {
    width: calc(70% - 10px);
    height: 100%;
    background: #56aadf;
  }
  .top-right {
    width: calc(30% - 10px);
    height: 100%;
    background: #3e7da4;
  }
}
.bottom {
  width: 100%;
  .tab-wrapper {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
  }
  .bottom-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .content-item {
      width: calc(100% / v-bind(itemsPerRow) - v-bind(itemsReduction));
      height: 200px;
      background-color: #3e7da4;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 30px;
    }
    .content-item + .content-item {
      margin-left: 10px;
    }
  }
}
</style>
