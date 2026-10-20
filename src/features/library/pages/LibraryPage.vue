<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import LibraryGameCard from '@/features/library/components/LibraryGameCard.vue'
import LibraryToolbar from '@/features/library/components/LibraryToolbar.vue'

import type { GameSummary } from '@/features/catalog/types/game'
import type { LibraryStatus } from '@/features/library/types/library'

interface LibraryEntryMock {
  id: number
  game: GameSummary
  status: LibraryStatus
  personalRating: number | null
  hidden: boolean
  updatedAt: string
}

const { t } = useI18n()

const search = ref('')
const status = ref('')
const sort = ref('recent')

const libraryEntries = ref<LibraryEntryMock[]>([
  {
    id: 1,
    game: {
      provider: 'RAWG',
      externalId: '326243',
      title: 'Elden Ring',
      releaseDate: '2022-02-25',
      externalRating: 9.2,
      genres: [
        {
          slug: 'rpg',
          name: 'RPG',
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
    },
    status: 'PLAYING',
    personalRating: 9.5,
    hidden: false,
    updatedAt: '2026-10-14T08:30:00Z',
  },
  {
    id: 2,
    game: {
      provider: 'RAWG',
      externalId: 'hades',
      title: 'Hades',
      releaseDate: '2020-09-17',
      externalRating: 9,
      genres: [
        {
          slug: 'action',
          name: 'Acción',
        },
        {
          slug: 'indie',
          name: 'Indie',
        },
      ],
      platforms: [
        {
          slug: 'pc',
          name: 'PC',
        },
      ],
    },
    status: 'COMPLETED',
    personalRating: 9,
    hidden: false,
    updatedAt: '2026-10-10T08:30:00Z',
  },
])

const filteredEntries = computed(() => {
  const normalizedSearch = search.value.trim().toLowerCase()

  let entries = [...libraryEntries.value]

  if (status.value) {
    entries = entries.filter(
      (entry) => entry.status === status.value,
    )
  }

  if (normalizedSearch) {
    entries = entries.filter((entry) =>
      entry.game.title.toLowerCase().includes(normalizedSearch),
    )
  }

  switch (sort.value) {
    case 'rating':
      entries.sort(
        (a, b) =>
          (b.personalRating ?? -1) - (a.personalRating ?? -1),
      )
      break

    case 'title':
      entries.sort((a, b) =>
        a.game.title.localeCompare(b.game.title),
      )
      break

    case 'recent':
    default:
      entries.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime(),
      )
      break
  }

  return entries
})

const totalGames = computed(() => libraryEntries.value.length)

function handleSearch(value: string) {
  search.value = value

  // Cuando exista backend:
  //
  // GET /api/v1/me/library?q=value
}

function handleEdit(entryId: number) {
  console.log('Editar entrada:', entryId)

  // Más adelante:
  // selectedEntry.value = ...
  // isEditModalOpen.value = true
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
          {{ t('library.gamesCount', { count: totalGames }) }}
        </p>
      </div>
    </header>

    <LibraryToolbar
      v-model:search="search"
      v-model:status="status"
      v-model:sort="sort"
      @search="handleSearch"
    />

    <div
      v-if="filteredEntries.length"
      class="library-page__grid"
    >
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

    <div
      v-else
      class="library-page__empty"
    >
      <h2 class="library-page__empty-title">
        {{ t('library.emptyTitle') }}
      </h2>

      <p class="library-page__empty-description">
        {{ t('library.emptyDescription') }}
      </p>

      <RouterLink
        to="/games"
        class="library-page__explore"
      >
        {{ t('library.exploreGames') }}
      </RouterLink>
    </div>
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
    grid-template-columns: repeat(
      auto-fill,
      minmax(220px, 1fr)
    );
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
