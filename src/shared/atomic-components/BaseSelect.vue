<script setup lang="ts">
import type { SelectOption } from '../types/ui';

withDefaults(
  defineProps<{
    modelValue?: string;
    options: SelectOption[];
    placeholder?: string;
    invalid?: boolean;
  }>(),
  { modelValue: '' },
);

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();
</script>

<template>
  <select
    class="select"
    :value="modelValue"
    :aria-invalid="invalid || undefined"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped lang="scss">
.select {
  width: 100%;
  min-height: 48px;
  padding: 0 var(--space-6) 0 var(--space-4);
  background-color: var(--color-surface);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a9b0bf' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--font-size-md);
  appearance: none;

  &:focus { border-color: var(--color-accent); box-shadow: var(--focus-ring); outline: none; }
  &[aria-invalid='true'] { border-color: var(--color-danger); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}
</style>
