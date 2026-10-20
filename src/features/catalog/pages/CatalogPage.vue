<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import GameCard from '@/features/catalog/components/GameCard.vue'
import GameGrid from '@/features/catalog/components/GameGrid.vue'
import { mockGames } from '@/features/catalog/mocks/games.mock'

import FilterChips from '@/shared/components/FilterChips.vue'
import SearchInput from '@/shared/components/SearchInput.vue'

import type { SelectOption } from '@/shared/types/ui'

const { t } = useI18n()

const search = ref('')
const selectedGenre = ref('all')

const genreOptions: SelectOption[] = [
  { value: 'all', label: t('catalog.filters.all') },
  { value: 'rpg', label: 'RPG' },
  { value: 'action', label: t('catalog.filters.action') },
  { value: 'adventure', label: t('catalog.filters.adventure') },
  { value: 'indie', label: 'Indie' },
]

function handleSearch(value: string) {
  console.log('Buscar:', value)
}

function handleRetry() {
  console.log('Reintentar carga')
}
</script>

<template>
  <section class="catalog-page">
    <h1 class="catalog-page__title">
      {{ t('catalog.title') }}
    </h1>

    <SearchInput
      v-model="search"
      :placeholder="t('catalog.searchPlaceholder')"
      :input-label="t('catalog.searchLabel')"
      :clear-label="t('common.clear')"
      @search="handleSearch"
    />

    <FilterChips
      v-model="selectedGenre"
      :options="genreOptions"
      :group-label="t('catalog.filters.label')"
    />

    <GameGrid
      :empty="mockGames.length === 0"
      @retry="handleRetry"
    >
      <GameCard
        v-for="game in mockGames"
        :key="`${game.provider}-${game.externalId}`"
        :game="game"
      />
    </GameGrid>
  </section>
</template>

<style scoped lang="scss">
.catalog-page {
  width: 100%;
}

.catalog-page__title {
  margin-bottom: var(--space-5);
}
</style>
