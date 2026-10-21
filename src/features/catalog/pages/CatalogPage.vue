<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import GameCard from '@/features/catalog/components/GameCard.vue'
import GameGrid from '@/features/catalog/components/GameGrid.vue'
import { mockGames } from '@/mocks/games.mock'

import FilterChips from '@/shared/components/FilterChips.vue'
import SearchInput from '@/shared/components/SearchInput.vue'

import type { SelectOption } from '@/shared/types/ui'
import { filterGames } from '../utils/catalog.utils'

const { t } = useI18n()

const search = ref('')
const selectedGenre = ref('all')

const loading = ref(false)
const error = ref(false)

const genreOptions = computed<SelectOption[]>(() => [
  {
    value: 'all',
    label: t('catalog.filters.all'),
  },
  {
    value: 'rpg',
    label: t('catalog.filters.rpg'),
  },
  {
    value: 'action',
    label: t('catalog.filters.action'),
  },
  {
    value: 'adventure',
    label: t('catalog.filters.adventure'),
  },
  {
    value: 'indie',
    label: t('catalog.filters.indie'),
  },
])

const filteredGames = computed(() => filterGames(mockGames, search.value, selectedGenre.value))

function handleSearch(value: string) {
  search.value = value

  // Cuando conectemos RAWG, este será el punto donde
  // podremos lanzar la búsqueda remota usando el debounce
  // que ya proporciona SearchInput.
}

function clearFilters() {
  search.value = ''
  selectedGenre.value = 'all'
}

function handleRetry() {
  error.value = false

  // Cuando exista el servicio real:
  // loadGames()
}
</script>

<template>
  <section class="catalog-page">
    <header class="catalog-page__header">
      <h1 class="catalog-page__title">
        {{ t('catalog.title') }}
      </h1>

      <SearchInput
        v-model="search"
        class="catalog-page__search"
        :placeholder="t('catalog.searchPlaceholder')"
        :input-label="t('catalog.searchLabel')"
        :clear-label="t('catalog.searchClear')"
        @search="handleSearch"
      />

      <FilterChips
        v-model="selectedGenre"
        :options="genreOptions"
        :group-label="t('catalog.filters.label')"
      />
    </header>

    <GameGrid
      :loading="loading"
      :error="error"
      :empty="filteredGames.length === 0"
      @retry="handleRetry"
    >
      <GameCard
        v-for="game in filteredGames"
        :key="`${game.provider}-${game.externalId}`"
        :game="game"
      />

      <template #empty-actions>
        <button type="button" class="catalog-page__clear" @click="clearFilters">
          {{ t('catalog.clearFilters') }}
        </button>
      </template>
    </GameGrid>
  </section>
</template>

<style scoped lang="scss">
.catalog-page {
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

.catalog-page__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.catalog-page__title {
  font-size: 2rem;
  line-height: 1.15;
}

.catalog-page__search {
  width: 100%;
  max-width: 640px;
}

.catalog-page__clear {
  min-height: var(--touch-target);
  padding: 0 var(--space-4);
  color: var(--color-accent);
  font: inherit;
  font-weight: 600;
  background: none;
  border: 0;
  border-radius: var(--radius-md);
  cursor: pointer;

  &:hover {
    color: var(--color-accent-hover);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}
</style>
