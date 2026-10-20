<script setup lang="ts">
withDefaults(
  defineProps<{ width?: string; height?: string; radius?: string }>(),
  { width: '100%', height: '1rem', radius: 'var(--radius-sm)' },
);
</script>

<template>
  <span class="skeleton" :style="{ width, height, borderRadius: radius }" aria-hidden="true" />
</template>

<style scoped lang="scss">
.skeleton {
  display: block;
  background: linear-gradient(90deg, var(--color-surface) 25%, var(--color-surface-2) 50%, var(--color-surface) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

@keyframes shimmer { to { background-position: -200% 0; } }
</style>
