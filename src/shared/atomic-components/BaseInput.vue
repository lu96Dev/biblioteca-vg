<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string;
    type?: 'text' | 'email' | 'password' | 'search' | 'url';
    invalid?: boolean;
  }>(),
  { modelValue: '', type: 'text' },
);

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();
</script>

<template>
  <input
    class="input"
    :type="type"
    :value="modelValue"
    :aria-invalid="invalid || undefined"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped lang="scss">
.input {
  width: 100%;
  min-height: 48px;
  padding: 0 var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--font-size-md);

  &::placeholder { color: var(--color-text-muted); }
  &:focus { border-color: var(--color-accent); box-shadow: var(--focus-ring); outline: none; }
  &[aria-invalid='true'] { border-color: var(--color-danger); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
  &::-webkit-search-cancel-button { display: none; }
}
</style>
