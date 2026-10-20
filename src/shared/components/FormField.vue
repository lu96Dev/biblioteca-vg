<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
  label: string
  error?: string
  hint?: string
}>()

const errorId = computed(() => `${props.id}-error`)
const hintId = computed(() => `${props.id}-hint`)

// Se entrega al control (slot) para enlazar error y ayuda con aria-describedby.
const describedBy = computed(() => {
  const ids = []

  if (props.hint) {
    ids.push(hintId.value)
  }

  if (props.error) {
    ids.push(errorId.value)
  }

  return ids.length ? ids.join(' ') : undefined
})
</script>

<template>
  <div class="field">
    <label
      class="field__label"
      :for="id"
    >
      {{ label }}
    </label>

    <slot
      :described-by="describedBy"
      :invalid="Boolean(error)"
    />

    <p
      v-if="hint"
      :id="hintId"
      class="field__hint"
    >
      {{ hint }}
    </p>

    <p
      v-if="error"
      :id="errorId"
      class="field__error"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field__label {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.field__hint {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}

.field__error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}
</style>
