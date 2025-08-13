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
          v-for="(item, index) in contentList"
          class="content-item"
          :key="item._id"
          :style="{
            marginLeft: index % itemsPerRow !== 0 ? '10px' : '0',
            marginTop: index >= itemsPerRow ? '10px' : '0',
          }"
          @click="handleView(item)"
        >
          {{ item.productName }}
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
        <form @submit.prevent="handleSubmit">
          <UFormField label="产品名称" name="productName">
            <UInput v-model="form.productName" placeholder="请输入产品名称" />
          </UFormField>
          <UFormField label="所有者" name="owner" class="mt-4">
            <UInput v-model="form.owner" placeholder="请输入所有者" />
          </UFormField>
          <UFormField label="描述" name="description" class="mt-4">
            <UInput v-model="form.description" placeholder="请输入描述" />
          </UFormField>
          <UFormField label="价值" name="price" class="mt-4">
            <UInput v-model="form.price" placeholder="请输入价值" />
          </UFormField>
          <UFormField label="库存" name="stock" class="mt-4">
            <UInput v-model="form.stock" placeholder="请输入库存" />
          </UFormField>
          <UFormField label="类别" name="category" class="mt-4">
            <UInput v-model="form.category" placeholder="请输入类别" />
          </UFormField>
          <UFormField label="图片" name="imageUrl" class="mt-4">
            <!-- <UInput v-model="form.imageUrl" placeholder="请输入图片" /> -->
            <UFileUpload :modelValue="form.imageUrl" multiple class="w-96 min-h-48" @update:modelValue="onFilesChange" />
          </UFormField>

          <div class="mt-6">
            <UButton :loading="loading" type="submit" color="primary" block>保存</UButton>
          </div>
        </form>
      </template>
    </UModal>
    <UModal
      v-model:open="open"
      title="Modal with close button"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full',
      }"
    >
      <template #body>
        <form @submit.prevent="handleSubmit">
          <UFormField label="产品名称" name="productName">
            <UInput v-model="productInfo.productName" placeholder="请输入产品名称" disabled />
          </UFormField>
          <UFormField label="所有者" name="owner" class="mt-4">
            <UInput v-model="productInfo.owner" placeholder="请输入所有者" disabled />
          </UFormField>
          <UFormField label="描述" name="description" class="mt-4">
            <UInput v-model="productInfo.description" placeholder="请输入描述" disabled />
          </UFormField>
          <UFormField label="价值" name="price" class="mt-4">
            <UInput v-model="productInfo.price" placeholder="请输入价值" disabled />
          </UFormField>
          <UFormField label="库存" name="stock" class="mt-4">
            <UInput v-model="productInfo.stock" placeholder="请输入库存" disabled />
          </UFormField>
          <UFormField label="类别" name="category" class="mt-4">
            <UInput v-model="productInfo.category" placeholder="请输入类别" disabled />
          </UFormField>
          <UFormField label="图片" name="imageUrl" class="mt-4">
            <UFileUpload v-model="productInfo.imageUrl" multiple class="w-96 min-h-48" />
          </UFormField>

          <div class="mt-6">
            <UButton :loading="loading" color="primary" block @click="handleChange">申请交换</UButton>
          </div>
        </form>
      </template>
    </UModal>
    <UDrawer v-model:open="changeOpen" title="选择你的产品去交换">
      <template #content>
        <span @click="handleChoose">产品1</span>
        |
        <span @click="handleChoose">产品2</span>
        |
        <span @click="handleChoose">产品3</span>
      </template>
    </UDrawer>
  </div>
</template>
<script setup lang="ts">
// type
import type { ProductType } from '~~/server/models/Product'
// plugins
const { $fetch } = useNuxtApp()
// variables
const loading = ref(false)
const open = ref(false)
const changeOpen = ref(false)
const form: Partial<ProductType> = reactive({})
const productInfo = ref<Partial<ProductType>>({})
const itemsPerRow = 5
const itemsReduction = ((itemsPerRow - 1) * 10) / itemsPerRow + 'px'
let contentList = ref<(ProductType & { _id: string })[]>([])
//methods
async function getProductList() {
  loading.value = true
  await $fetch('/api/public/product/product-list', {
    method: 'POST',
    body: {},
  })
    .then(res => {
      contentList.value = res.data
      console.log('+res+', contentList)
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
  await $fetch('/api/private/product/product-add', {
    method: 'POST',
    body: {
      ...form,
    },
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
function handleView(record: ProductType) {
  console.log('Viewing record:', record)
  productInfo.value = { ...record }
  open.value = true
  // 这里可以添加跳转逻辑或其他操作
}
function handleChange() {
  console.log('申请交换', productInfo.value)
  changeOpen.value = true
  // 这里可以添加申请交换的逻辑
}
function handleChoose() {
  console.log('选择产品进行交换')
  changeOpen.value = false
  open.value = true
  // 这里可以添加选择产品进行交换的逻辑
}
function onFilesChange(...args: unknown[]) {
  const newFiles = args[0] as File[]
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
