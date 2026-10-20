<script setup lang="ts">
import BaseIcon from './BaseIcon.vue';

// `emptyLabel` (ya traducido) se muestra cuando no hay puntuación.
defineProps<{ value?: number | null; emptyLabel?: string }>();
</script>

<template>
  <span v-if="value != null" class="rating">
    <BaseIcon name="star" :size="14" />
    {{ value.toFixed(1) }}
  </span>
  <span v-else-if="emptyLabel" class="rating rating--empty">{{ emptyLabel }}</span>
</template>

<style scoped lang="scss">
.rating {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--color-rating);
  font-size: var(--font-size-sm);
  font-weight: 600;

  &--empty { color: var(--color-text-muted); font-weight: 400; }
}
</style>
