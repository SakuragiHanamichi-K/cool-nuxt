<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <div>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>
