<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import BaseSelect from '@/shared/atomic-components/BaseSelect.vue'
import FilterChips from '@/shared/components/FilterChips.vue'
import SearchInput from '@/shared/components/SearchInput.vue'

import type { SelectOption } from '@/shared/types/ui'

// status: '' = todos.
// sort: 'recent' | 'rating' | 'title'
// Debe alinearse con la lista cerrada de `sort` del backend.
defineProps<{
  search: string
  status: string
  sort: string
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'search', value: string): void
  (e: 'update:status', value: string): void
  (e: 'update:sort', value: string): void
}>()

const { t } = useI18n()

const statusOptions = computed<SelectOption[]>(() => [
  {
    value: '',
    label: t('library.status.all'),
  },
  {
    value: 'PLAYING',
    label: t('library.status.PLAYING'),
  },
  {
    value: 'COMPLETED',
    label: t('library.status.COMPLETED'),
  },
  {
    value: 'WANT_TO_PLAY',
    label: t('library.status.WANT_TO_PLAY'),
  },
  {
    value: 'DROPPED',
    label: t('library.status.DROPPED'),
  },
])

const sortOptions = computed<SelectOption[]>(() => [
  {
    value: 'recent',
    label: t('library.sort.recent'),
  },
  {
    value: 'rating',
    label: t('library.sort.rating'),
  },
  {
    value: 'title',
    label: t('library.sort.title'),
  },
])
</script>

<template>
  <div class="toolbar">
    <FilterChips
      :options="statusOptions"
      :model-value="status"
      :group-label="t('library.statusFilter')"
      @update:model-value="emit('update:status', $event)"
    />

    <div class="toolbar__row">
      <SearchInput
        class="toolbar__search"
        :model-value="search"
        :input-label="t('library.searchLabel')"
        :placeholder="t('library.searchLabel')"
        :clear-label="t('library.searchClear')"
        @update:model-value="emit('update:search', $event)"
        @search="emit('search', $event)"
      />

      <BaseSelect
        class="toolbar__sort"
        :model-value="sort"
        :options="sortOptions"
        :aria-label="t('library.sortLabel')"
        @update:model-value="emit('update:sort', $event)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.toolbar {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.toolbar__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.toolbar__search {
  flex: 1 1 260px;
  max-width: 480px;
}

.toolbar__sort {
  flex: 0 0 200px;
}
</style>
