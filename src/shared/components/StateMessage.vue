<script setup lang="ts">
import BaseIcon from '@/shared/atomic-components/BaseIcon.vue'

// Estado vacío o de error de una pantalla.
// Las acciones (botón de reintentar, etc.) van en el slot.
withDefaults(
  defineProps<{
    variant?: 'empty' | 'error'
    title: string
    description?: string
  }>(),
  {
    variant: 'empty',
  },
)
</script>

<template>
  <div :class="['state', `state--${variant}`]" :role="variant === 'error' ? 'alert' : undefined">
    <BaseIcon v-if="variant === 'error'" name="alert" :size="32" />

    <h2 class="state__title">
      {{ title }}
    </h2>

    <p v-if="description" class="state__description">
      {{ description }}
    </p>

    <div v-if="$slots.default" class="state__actions">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-7) var(--space-4);
  text-align: center;

  &--error {
    color: var(--color-danger);
  }

  &__title {
    color: var(--color-text);
    font-size: var(--font-size-lg);
  }

  &__description {
    max-width: 420px;
    color: var(--color-text-muted);
  }

  &__actions {
    margin-top: var(--space-3);
  }
}
</style>
