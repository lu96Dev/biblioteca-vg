<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import EditLibraryEntryModal from '@/features/library/components/modals/EditLibraryEntryModal.vue'
import LibraryGameCard from '@/features/library/components/LibraryGameCard.vue'
import LibraryToolbar from '@/features/library/components/LibraryToolbar.vue'
import { useLibrary } from '@/features/library/composables/useLibrary'

import type { AddToLibraryPayload, LibraryEntry } from '@/features/library/types/library'

const { t } = useI18n()

const { entries: libraryEntries, updateEntry, removeEntry } = useLibrary()

const search = ref('')
const status = ref('')
const sort = ref('recent')

const selectedEntry = ref<LibraryEntry>()

const isEditModalOpen = computed(() => Boolean(selectedEntry.value))

const filteredEntries = computed(() => {
  const normalizedSearch = search.value.trim().toLowerCase()

  let entries = [...libraryEntries.value]

  if (status.value) {
    entries = entries.filter((entry) => entry.status === status.value)
  }

  if (normalizedSearch) {
    entries = entries.filter((entry) => entry.game.title.toLowerCase().includes(normalizedSearch))
  }

  switch (sort.value) {
    case 'rating':
      entries.sort((a, b) => (b.personalRating ?? -1) - (a.personalRating ?? -1))
      break

    case 'title':
      entries.sort((a, b) => a.game.title.localeCompare(b.game.title))
      break

    case 'recent':
    default:
      entries.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      break
  }

  return entries
})

const totalGames = computed(() => libraryEntries.value.length)

function handleSearch(value: string) {
  search.value = value
}

function handleEdit(entryId: number) {
  selectedEntry.value = libraryEntries.value.find((entry) => entry.id === entryId)
}

function closeEditModal() {
  selectedEntry.value = undefined
}

function handleUpdateEntry(payload: AddToLibraryPayload) {
  if (!selectedEntry.value) {
    return
  }

  updateEntry(selectedEntry.value.id, payload)

  closeEditModal()
}

function handleRemoveEntry() {
  if (!selectedEntry.value) {
    return
  }

  removeEntry(selectedEntry.value.id)
  closeEditModal()
}
</script>

<template>
  <section class="library-page">
    <header class="library-page__header">
      <div>
        <h1 class="library-page__title">
          {{ t('library.title') }}
        </h1>

        <p class="library-page__count">
          {{
            t('library.gamesCount', {
              count: totalGames,
            })
          }}
        </p>
      </div>
    </header>

    <LibraryToolbar
      v-model:search="search"
      v-model:status="status"
      v-model:sort="sort"
      @search="handleSearch"
    />

    <div v-if="filteredEntries.length" class="library-page__grid">
      <LibraryGameCard
        v-for="entry in filteredEntries"
        :key="entry.id"
        :game="entry.game"
        :status="entry.status"
        :status-label="t(`library.statusSingle.${entry.status}`)"
        :personal-rating="entry.personalRating"
        :no-rating-label="t('library.ratingEmpty')"
        :hidden="entry.hidden"
        :hidden-label="t('library.hidden')"
        :edit-label="t('library.edit')"
        @edit="handleEdit(entry.id)"
      />
    </div>

    <div v-else class="library-page__empty">
      <h2 class="library-page__empty-title">
        {{ t('library.emptyTitle') }}
      </h2>

      <p class="library-page__empty-description">
        {{ t('library.emptyDescription') }}
      </p>

      <RouterLink to="/games" class="library-page__explore">
        {{ t('library.exploreGames') }}
      </RouterLink>
    </div>

    <EditLibraryEntryModal
      v-if="selectedEntry"
      :open="isEditModalOpen"
      :entry="selectedEntry"
      @close="closeEditModal"
      @submit="handleUpdateEntry"
      @remove="handleRemoveEntry"
    />
  </section>
</template>

<style scoped lang="scss">
.library-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);

  @media (min-width: 768px) {
    padding: var(--space-7);
  }
}

.library-page__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
}

.library-page__title {
  font-size: 2rem;
  line-height: 1.15;
}

.library-page__count {
  margin-top: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.library-page__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--space-5);
  }
}

.library-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-7) var(--space-4);
  text-align: center;
}

.library-page__empty-title {
  font-size: var(--font-size-lg);
}

.library-page__empty-description {
  max-width: 480px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.library-page__explore {
  display: inline-flex;
  align-items: center;
  min-height: var(--touch-target);
  margin-top: var(--space-2);
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: var(--color-accent-hover);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}
</style>
