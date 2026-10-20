<script setup lang="ts">
import BaseButton from '@/shared/atomic-components/BaseButton.vue'

// Puntuación personal: de 0.0 a 10.0 en pasos de 0.5, o null (sin puntuar).
const props = defineProps<{
  id: string
  modelValue: number | null
  emptyLabel: string
  clearLabel: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

function onInput(event: Event) {
  emit('update:modelValue', Number((event.target as HTMLInputElement).value))
}
</script>

<template>
  <div class="rating-input">
    <input
      :id="id"
      class="rating-input__range"
      type="range"
      min="0"
      max="10"
      step="0.5"
      :value="props.modelValue ?? 0"
      :aria-valuetext="
        props.modelValue === null ? emptyLabel : `${props.modelValue.toFixed(1)} / 10`
      "
      @input="onInput"
    />

    <output class="rating-input__value" :for="id" aria-live="polite">
      {{ props.modelValue === null ? emptyLabel : `${props.modelValue.toFixed(1)} / 10` }}
    </output>

    <BaseButton
      v-if="props.modelValue !== null"
      variant="ghost"
      @click="emit('update:modelValue', null)"
    >
      {{ clearLabel }}
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.rating-input {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
}

.rating-input__range {
  flex: 1;
  min-width: 160px;
  min-height: var(--touch-target);
  accent-color: var(--color-accent);
}

.rating-input__value {
  min-width: 72px;
  color: var(--color-rating);
  font-weight: 600;
}
</style>
