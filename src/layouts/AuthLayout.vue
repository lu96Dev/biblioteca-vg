<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="auth-layout">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
