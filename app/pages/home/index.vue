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
    <UModal
      title="Modal with close button"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full',
      }"
    >
      <UButton label="Open" color="neutral" variant="subtle" />

      <template #body>
        <!-- <form @submit.prevent="handleSubmit">
          <UFormField label="用户名" name="username">
            <UInput v-model="form.username" placeholder="请输入用户名" required />
          </UFormField>

          <UFormField label="密码" name="password" class="mt-4">
            <UInput v-model="form.password" type="password" placeholder="请输入密码" required />
          </UFormField>

          <div class="mt-6">
            <UButton :loading="loading" type="submit" color="primary" block>登录 / 注册</UButton>
          </div>
        </form> -->
      </template>
    </UModal>
  </div>
</template>
<script setup lang="ts">
const { $fetch } = useNuxtApp()
const loading = ref(false)
const form = reactive({})
const itemsPerRow = 5
const itemsReduction = ((itemsPerRow - 1) * 10) / itemsPerRow + 'px'
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
async function getProductList() {
  loading.value = true
  await $fetch('/api/public/product/product-list', {
    method: 'POST',
    body: {},
  })
    .then(res => {
      console.log('+res+', res)
    })
    .catch(err => {
      console.log('err', err)
    })
    .finally(() => {
      loading.value = false
    })
}
async function handleSubmit() {
  loading.value = true
  await $fetch('/api/public/product/product-list', {
    method: 'POST',
    body: {},
  })
    .then(res => {
      console.log('+res+', res)
    })
    .catch(err => {
      console.log('err', err)
    })
    .finally(() => {
      loading.value = false
    })
}
onMounted(() => {
  getProductList()
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
