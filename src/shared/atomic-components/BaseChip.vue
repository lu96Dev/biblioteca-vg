<script setup lang="ts">
// Sin `interactive` es una etiqueta estática (géneros, plataformas).
// Con `interactive` es un botón de filtro con estado `selected`.
withDefaults(defineProps<{ interactive?: boolean; selected?: boolean }>(), {});
</script>

<template>
  <button
    v-if="interactive"
    type="button"
    :class="['chip', 'chip--interactive', { 'chip--selected': selected }]"
    :aria-pressed="selected"
  >
    <slot />
  </button>
  <span v-else class="chip"><slot /></span>
</template>

<style scoped lang="scss">
.chip {
  display: inline-flex;
  align-items: center;
  min-height: var(--touch-target);
  padding: 0 var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  white-space: nowrap;

  &--interactive { cursor: pointer; }
  &--interactive:hover { background: var(--color-surface-2); }
  &--interactive:focus-visible { box-shadow: var(--focus-ring); outline: none; }
  &--selected, &--selected:hover { background: var(--color-accent); border-color: var(--color-accent); color: #fff; }
}
</style>
