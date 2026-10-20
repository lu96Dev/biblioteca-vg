<script setup lang="ts">
import type { LibraryStatus } from '@/features/library/types/library'

// El texto (`label`) llega ya traducido.
// El color es solo un refuerzo visual.
defineProps<{
  status: LibraryStatus
  label: string
}>()
</script>

<template>
  <span :class="['status', `status--${status}`]">
    <span
      class="status__dot"
      aria-hidden="true"
    />

    {{ label }}
  </span>
</template>

<style scoped lang="scss">
.status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);

  &__dot {
    width: 8px;
    height: 8px;
    background: currentColor;
    border-radius: 50%;
  }

  &--WANT_TO_PLAY {
    color: var(--color-info);
  }

  &--PLAYING {
    color: var(--color-success);
  }

  &--COMPLETED {
    color: var(--color-violet);
  }

  &--DROPPED {
    color: var(--color-danger);
  }
}
</style>
