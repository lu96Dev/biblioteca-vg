<script setup lang="ts">
import BaseSpinner from './BaseSpinner.vue';

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'md' | 'lg';
    block?: boolean;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
);
</script>

<template>
  <button
    :type="type"
    :class="['btn', `btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <BaseSpinner v-if="loading" :size="16" />
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: var(--touch-target);
  padding: 0 var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: var(--font-size-md);
  transition: background-color 0.15s, border-color 0.15s;

  &--lg { min-height: 48px; }
  &--block { width: 100%; }

  &--primary { background: var(--color-accent); color: #fff; }
  &--primary:hover:not(:disabled) { background: var(--color-accent-hover); }

  &--secondary { background: var(--color-surface); border-color: var(--color-border); color: var(--color-text); }
  &--secondary:hover:not(:disabled) { background: var(--color-surface-2); }

  &--ghost { background: transparent; color: var(--color-text-muted); }
  &--ghost:hover:not(:disabled) { color: var(--color-text); background: var(--color-surface); }

  &:focus-visible { box-shadow: var(--focus-ring); outline: none; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}
</style>
