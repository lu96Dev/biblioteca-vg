<script setup lang="ts">
import { onBeforeUnmount } from 'vue'

import BaseIcon from '@/shared/atomic-components/BaseIcon.vue'
import BaseInput from '@/shared/atomic-components/BaseInput.vue'

// `update:modelValue` se emite en cada pulsación; `search` se emite con debounce
// (úsalo para llamar a la API y no gastar la cuota del proveedor).
const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    inputLabel: string
    clearLabel: string
    debounce?: number
  }>(),
  {
    modelValue: '',
    debounce: 300,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}>()

let timer: ReturnType<typeof setTimeout> | undefined

function onInput(value: string) {
  emit('update:modelValue', value)

  clearTimeout(timer)

  timer = setTimeout(() => {
    emit('search', value)
  }, props.debounce)
}

function clear() {
  clearTimeout(timer)
  emit('update:modelValue', '')
  emit('search', '')
}

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<template>
  <div class="search" @keydown.esc="clear">
    <BaseIcon class="search__icon" name="search" />

    <BaseInput
      class="search__input"
      type="search"
      :model-value="modelValue"
      :placeholder="placeholder"
      :aria-label="inputLabel"
      @update:model-value="onInput"
    />

    <button
      v-if="modelValue"
      type="button"
      class="search__clear"
      :aria-label="clearLabel"
      @click="clear"
    >
      <BaseIcon name="close" :size="18" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.search {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search__icon {
  position: absolute;
  left: var(--space-4);
  color: var(--color-text-muted);
  pointer-events: none;
}

.search__input {
  padding-right: 48px;
  padding-left: calc(var(--space-4) + 28px);
}

.search__clear {
  position: absolute;
  right: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--touch-target);
  height: var(--touch-target);
  color: var(--color-text-muted);
  background: none;
  border: 0;
  border-radius: var(--radius-md);

  &:hover {
    color: var(--color-text);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}
</style>
