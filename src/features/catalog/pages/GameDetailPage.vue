<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import GameHero from '@/features/catalog/components/GameHero.vue'
import RawgAttribution from '@/features/catalog/components/RawgAttribution.vue'
import AddToLibraryModal from '@/features/library/components/modals/AddToLibraryModal.vue'

import BaseChip from '@/shared/atomic-components/BaseChip.vue'

import type { GameDetail } from '@/features/catalog/types/game'
import type { LibraryStatus } from '@/features/library/types/library'

const { t } = useI18n()

const isAddModalOpen = ref(false)

// MOCK TEMPORAL.
// Más adelante vendrá del endpoint:
// GET /api/v1/games/:provider/:externalId
const game: GameDetail = {
  provider: 'RAWG',
  externalId: '326243',
  title: 'Elden Ring',
  description: 'Un RPG de acción ambientado en un amplio mundo de fantasía.',
  coverUrl: '',
  backgroundUrl: '',
  releaseDate: '2022-02-25',
  developer: 'FromSoftware',
  externalRating: 9.2,
  genres: [
    {
      slug: 'rpg',
      name: 'RPG',
    },
    {
      slug: 'action',
      name: 'Acción',
    },
  ],
  platforms: [
    {
      slug: 'pc',
      name: 'PC',
    },
    {
      slug: 'playstation-5',
      name: 'PlayStation 5',
    },
  ],
}

function openAddToLibraryModal() {
  isAddModalOpen.value = true
}

function closeAddToLibraryModal() {
  isAddModalOpen.value = false
}
function handleAddToLibrary(payload: {
  status: LibraryStatus
  personalRating: number | null
  hidden: boolean
}) {
  console.log('Añadir a biblioteca', {
    provider: game.provider,
    externalId: game.externalId,
    ...payload,
  })

  closeAddToLibraryModal()
}
</script>

<template>
  <section class="game-detail-page">
    <GameHero :game="game" @add="openAddToLibraryModal" />

    <div class="game-detail-page__content">
      <section v-if="game.description" class="game-detail-page__section">
        <h2>
          {{ t('gameDetail.about') }}
        </h2>

        <p class="game-detail-page__description">
          {{ game.description }}
        </p>
      </section>

      <section v-if="game.genres.length" class="game-detail-page__section">
        <h2>
          {{ t('gameDetail.genres') }}
        </h2>

        <div class="game-detail-page__chips">
          <BaseChip v-for="genre in game.genres" :key="genre.slug">
            {{ genre.name }}
          </BaseChip>
        </div>
      </section>

      <section v-if="game.platforms.length" class="game-detail-page__section">
        <h2>
          {{ t('gameDetail.platforms') }}
        </h2>

        <div class="game-detail-page__chips">
          <BaseChip v-for="platform in game.platforms" :key="platform.slug">
            {{ platform.name }}
          </BaseChip>
        </div>
      </section>

      <RawgAttribution :label="t('catalog.rawgAttribution')" />
    </div>
    <AddToLibraryModal
      :open="isAddModalOpen"
      :game-title="game.title"
      @close="closeAddToLibraryModal"
      @submit="handleAddToLibrary"
    />
  </section>
</template>

<style scoped lang="scss">
.game-detail-page {
  width: 100%;
}

.game-detail-page__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
}

.game-detail-page__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.game-detail-page__description {
  max-width: 800px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.game-detail-page__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>
