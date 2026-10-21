<script setup lang="ts">
import { ref, watch } from 'vue'

import BaseIcon from '@/shared/atomic-components/BaseIcon.vue'

const props = withDefaults(
  defineProps<{
    name: string
    src?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  },
)

const imageError = ref(false)

watch(
  () => props.src,
  () => {
    imageError.value = false
  },
)
</script>

<template>
  <span class="avatar" :class="`avatar--${size}`">
    <img
      v-if="src && !imageError"
      class="avatar__image"
      :src="src"
      :alt="name"
      @error="imageError = true"
    />

    <BaseIcon
      v-else
      class="avatar__fallback"
      name="user"
      :size="size === 'lg' ? 60 : size === 'md' ? 24 : 16"
      aria-hidden="true"
    />
  </span>
</template>

<style scoped lang="scss">
.avatar {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: var(--color-text-muted);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: 50%;

  &--sm {
    width: 30px;
    height: 30px;
  }

  &--md {
    width: 56px;
    height: 56px;
  }

  &--lg {
    width: 144px;
    height: 144px;

    /*
     * Este borde utiliza el fondo de la aplicación
     * para separar visualmente el avatar del banner.
     */
    border: 5px solid var(--color-bg);

    box-shadow:
      0 0 0 1px var(--color-border),
      0 8px 24px rgba(0, 0, 0, 0.3);
  }
}
.avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar__fallback {
  flex-shrink: 0;
}
</style>
