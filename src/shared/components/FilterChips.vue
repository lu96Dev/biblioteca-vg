<script setup lang="ts">
import BaseChip from '@/shared/atomic-components/BaseChip.vue'

import type { SelectOption } from '@/shared/types/ui'

defineProps<{
  options: SelectOption[]
  modelValue: string
  groupLabel: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div
    class="filters"
    role="group"
    :aria-label="groupLabel"
  >
    <BaseChip
      v-for="option in options"
      :key="option.value"
      interactive
      :selected="option.value === modelValue"
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </BaseChip>
  </div>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>
