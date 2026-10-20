<script lang="ts">
// Los atributos (id, placeholder, aria-*) se aplican al <textarea>, no al contenedor.
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    rows?: number;
    maxlength?: number;
    showCount?: boolean;
    invalid?: boolean;
  }>(),
  { modelValue: '', rows: 4 },
);

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();
const attrs = useAttrs();
const count = computed(() => props.modelValue.length);
</script>

<template>
  <div class="textarea">
    <textarea
      v-bind="attrs"
      class="textarea__control"
      :rows="rows"
      :maxlength="maxlength"
      :value="modelValue"
      :aria-invalid="invalid || undefined"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <span v-if="showCount && maxlength" class="textarea__count" aria-hidden="true">
      {{ count }} / {{ maxlength }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.textarea { display: flex; flex-direction: column; gap: var(--space-1); }

.textarea__control {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--font-size-md);
  resize: vertical;

  &::placeholder { color: var(--color-text-muted); }
  &:focus { border-color: var(--color-accent); box-shadow: var(--focus-ring); outline: none; }
  &[aria-invalid='true'] { border-color: var(--color-danger); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}

.textarea__count {
  align-self: flex-end;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
</style>
