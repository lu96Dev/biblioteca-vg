<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import EditLibraryEntryModal from '@/features/library/components/modals/EditLibraryEntryModal.vue'
import GameHero from '@/features/catalog/components/GameHero.vue'
import RawgAttribution from '@/features/catalog/components/RawgAttribution.vue'
import { findGameDetail } from '@/features/catalog/utils/catalog.utils'

import AddToLibraryModal from '@/features/library/components/modals/AddToLibraryModal.vue'
import { useLibrary } from '@/features/library/composables/useLibrary'

import BaseChip from '@/shared/atomic-components/BaseChip.vue'
import StateMessage from '@/shared/components/StateMessage.vue'

import { mockGameDetails } from '@/mocks/game-details.mock'

import type { AddToLibraryPayload } from '@/features/library/types/library'

const { t } = useI18n()
const route = useRoute()

const { addGame, updateEntry, removeEntry, findEntry } = useLibrary()

const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const addError = ref<string>()

const provider = computed(() => String(route.params.provider))

const externalId = computed(() => String(route.params.externalId))

const game = computed(() => findGameDetail(mockGameDetails, provider.value, externalId.value))

const libraryEntry = computed(() => {
  if (!game.value) {
    return undefined
  }

  return findEntry(
    game.value.provider,
    game.value.externalId,
  )
})

const alreadyInLibrary = computed(() =>
  Boolean(libraryEntry.value),
)

function handleUpdateLibraryEntry(payload: AddToLibraryPayload) {
  if (!libraryEntry.value) {
    return
  }

  updateEntry(libraryEntry.value.id, payload)

  isEditModalOpen.value = false
}
function openAddToLibraryModal() {
  if (!game.value) {
    return
  }

  addError.value = undefined
  isAddModalOpen.value = true
}

function closeAddToLibraryModal() {
  isAddModalOpen.value = false
  addError.value = undefined
}

function handleLibraryAction() {
  if (!game.value) {
    return
  }

  if (alreadyInLibrary.value) {
    isEditModalOpen.value = true
    return
  }

  addError.value = undefined
  isAddModalOpen.value = true
}

function handleAddToLibrary(payload: AddToLibraryPayload) {
  if (!game.value) {
    return
  }

  addError.value = undefined

  try {
    addGame(game.value, payload)
    closeAddToLibraryModal()
  } catch (error) {
    if (error instanceof Error && error.message === 'GAME_ALREADY_IN_LIBRARY') {
      addError.value = t('library.errors.alreadyAdded')
    }
  }
}
function closeEditLibraryModal() {
  isEditModalOpen.value = false
}

function handleRemoveLibraryEntry() {
  if (!libraryEntry.value) {
    return
  }

  removeEntry(libraryEntry.value.id)
  isEditModalOpen.value = false
}
</script>

<template>
  <section class="game-detail-page">
    <StateMessage
      v-if="!game"
      :title="t('gameDetail.notFoundTitle')"
      :description="t('gameDetail.notFoundDescription')"
    />

    <template v-else>
      <GameHero :game="game" :in-library="alreadyInLibrary" @library-action="handleLibraryAction" />

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
        :error-message="addError"
        @close="closeAddToLibraryModal"
        @submit="handleAddToLibrary"
      />

      <EditLibraryEntryModal
        v-if="libraryEntry"
        :open="isEditModalOpen"
        :entry="libraryEntry"
        @close="closeEditLibraryModal"
        @submit="handleUpdateLibraryEntry"
        @remove="handleRemoveLibraryEntry"
      />
    </template>
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

  @media (min-width: 768px) {
    padding: var(--space-7);
  }
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
