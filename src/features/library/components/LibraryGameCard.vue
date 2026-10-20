<script setup lang="ts">
import BaseIcon from '@/shared/atomic-components/BaseIcon.vue'
import Rating from '@/shared/atomic-components/Rating.vue'
import StatusLabel from './StatusLabel.vue'
import GameCard from '@/features/catalog/components/GameCard.vue'
import type { GameSummary } from '@/features/catalog/types/game'
import type { LibraryStatus } from '@/features/library/types/library'

// Todos los textos llegan ya traducidos desde la página.
defineProps<{
  game: GameSummary
  status: LibraryStatus
  statusLabel: string
  personalRating?: number | null
  noRatingLabel: string
  hidden?: boolean
  hiddenLabel: string
  editLabel: string
}>()

const emit = defineEmits<{
  (e: 'edit'): void
}>()
</script>

<template>
  <GameCard :game="game">
    <template #meta>
      <StatusLabel
        :status="status"
        :label="statusLabel"
      />

      <Rating
        :value="personalRating"
        :empty-label="noRatingLabel"
      />

      <BaseIcon
        v-if="hidden"
        name="eye-off"
        :size="16"
        :label="hiddenLabel"
      />

      <button
        type="button"
        class="edit"
        :aria-label="editLabel"
        @click="emit('edit')"
      >
        <BaseIcon
          name="edit"
          :size="18"
        />
      </button>
    </template>
  </GameCard>
</template>

<style scoped lang="scss">
.edit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--touch-target);
  height: var(--touch-target);
  margin:
    calc(var(--space-2) * -1)
    calc(var(--space-2) * -1)
    calc(var(--space-2) * -1)
    auto;
  color: var(--color-text-muted);
  background: none;
  border: 0;
  border-radius: var(--radius-md);

  &:hover {
    color: var(--color-text);
    background: var(--color-surface-2);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}
</style>
