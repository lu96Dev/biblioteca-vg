<script setup lang="ts">
// Marcador de posición hasta tener nombre y logotipo definitivos.
withDefaults(defineProps<{ size?: 'md' | 'xl'; text?: string }>(), { size: 'md', text: '[LOGO]' });
</script>

<template>
  <span :class="['logo', `logo--${size}`]"><slot>{{ text }}</slot></span>
</template>

<style scoped lang="scss">
.logo {
  font-weight: 700;
  color: var(--color-text);

  &--md { font-size: var(--font-size-lg); }
  &--xl { font-size: var(--font-size-hero); letter-spacing: -2px; line-height: 1; }
}
</style>
