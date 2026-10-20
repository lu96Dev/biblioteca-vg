<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BaseButton from '@/shared/atomic-components/BaseButton.vue'
import BaseSkeleton from '@/shared/atomic-components/BaseSkeleton.vue'
import StateMessage from '@/shared/components/StateMessage.vue'

// Cuadrícula con sus 4 estados: carga, error, vacío y datos.
withDefaults(
  defineProps<{
    loading?: boolean
    error?: boolean
    empty?: boolean
    skeletonCount?: number
  }>(),
  {
    loading: false,
    error: false,
    empty: false,
    skeletonCount: 8,
  },
)

const emit = defineEmits<{
  (e: 'retry'): void
}>()

const { t } = useI18n()
</script>

<template>
  <!-- Loading -->
  <div
    v-if="loading"
    class="grid"
    aria-busy="true"
  >
    <div
      v-for="n in skeletonCount"
      :key="n"
      class="grid__skeleton"
    >
      <BaseSkeleton
        height="auto"
        radius="var(--radius-lg)"
        class="grid__cover"
      />

      <BaseSkeleton width="70%" />
    </div>
  </div>

  <!-- Error -->
  <StateMessage
    v-else-if="error"
    variant="error"
    :title="t('states.errorTitle')"
    :description="t('states.errorDescription')"
  >
    <BaseButton
      variant="secondary"
      @click="emit('retry')"
    >
      {{ t('common.retry') }}
    </BaseButton>
  </StateMessage>

  <!-- Empty -->
  <StateMessage
    v-else-if="empty"
    :title="t('states.emptyTitle')"
    :description="t('states.emptyDescription')"
  >
    <slot name="empty-actions" />
  </StateMessage>

  <!-- Games -->
  <div
    v-else
    class="grid"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--space-5);
  }
}

.grid__skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.grid__cover {
  aspect-ratio: 3 / 4;
}
</style>
