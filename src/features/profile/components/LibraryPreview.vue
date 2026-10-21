<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import GameCard from '@/features/catalog/components/GameCard.vue'

import type { GameSummary } from '@/features/catalog/types/game'

defineProps<{
  games: GameSummary[]
  private?: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <section class="library-preview">
    <h2 class="library-preview__title">
      {{ t('profile.library') }}
    </h2>

    <div v-if="private" class="library-preview__empty">
      <p>
        {{ t('profile.libraryPrivate') }}
      </p>
    </div>

    <div v-else-if="games.length" class="library-preview__grid">
      <GameCard v-for="game in games" :key="`${game.provider}-${game.externalId}`" :game="game" />
    </div>

    <div v-else class="library-preview__empty">
      <p>
        {{ t('profile.libraryEmpty') }}
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.library-preview {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: 100%;
}

.library-preview__title {
  font-size: var(--font-size-lg);
}

.library-preview__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-5);
  }
}

.library-preview__empty {
  padding: var(--space-6);
  color: var(--color-text-muted);
  text-align: center;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
}
</style>
