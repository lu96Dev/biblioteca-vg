<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useProfile } from '@/features/profile/composables/useProfile'
import AppHeader from '@/layouts/components/AppHeader.vue'

const { profile } = useProfile()
</script>

<template>
  <div class="app-layout">
    <AppHeader
      :username="profile.username"
      :avatar-url="profile.avatarUrl || undefined"
    />

    <main class="app-layout__content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-layout {
  min-height: 100vh;

  &__content {
    width: 100%;
  }
}
</style>
