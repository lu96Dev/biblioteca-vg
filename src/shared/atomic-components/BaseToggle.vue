<script setup lang="ts">
defineProps<{ modelValue: boolean; label: string; disabled?: boolean }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
</script>

<template>
  <label class="toggle">
    <button
      type="button"
      role="switch"
      class="toggle__track"
      :aria-checked="modelValue"
      :disabled="disabled"
      @click="emit('update:modelValue', !modelValue)"
    >
      <span class="toggle__thumb" />
    </button>
    <span class="toggle__label">{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
.toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  min-height: var(--touch-target);
  cursor: pointer;
}

.toggle__track {
  position: relative;
  width: 44px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--color-border);
  transition: background-color 0.15s;

  &[aria-checked='true'] { background: var(--color-accent); }
  &:focus-visible { box-shadow: var(--focus-ring); outline: none; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}

.toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.15s;
}

.toggle__track[aria-checked='true'] .toggle__thumb { transform: translateX(20px); }

.toggle__label { font-size: var(--font-size-md); }
</style>
