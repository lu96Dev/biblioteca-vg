<script setup lang="ts">
import logoUrl from '@/assets/branding/logo.png'

withDefaults(
  defineProps<{
    alt?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    alt: 'Biblioteca VG',
    size: 'md',
  },
)
</script>

<template>
  <img
    class="logo"
    :class="`logo--${size}`"
    :src="logoUrl"
    :alt="alt"
  />
</template>

<style scoped lang="scss">
.logo {
  display: block;
  width: auto;
  object-fit: contain;

  &--sm {
    height: 48px;
  }

  &--md {
    height: 96px;
  }

  &--lg {
    height: 220px;
  }
}
</style>
