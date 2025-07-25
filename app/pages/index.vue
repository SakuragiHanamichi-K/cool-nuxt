<template>
  <div>
    <h1>Welcome to the homepage</h1>
    This is an auto-imported component
    <NuxtLink to="/about">去 About 页</NuxtLink>
  </div>
</template>
<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
console.log(runtimeConfig)
</script>
