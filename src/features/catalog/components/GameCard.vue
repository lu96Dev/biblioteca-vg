<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import Rating from '@/shared/atomic-components/Rating.vue'

import type { GameSummary } from '@/features/catalog/types/game'

const props = defineProps<{
  game: GameSummary
}>()

const to = computed(() => ({
  name: 'game-detail',
  params: {
    provider: props.game.provider,
    externalId: props.game.externalId,
  },
}))

const imageError = ref(false)
</script>

<template>
  <article class="card">
    <RouterLink :to="to" class="card__link">
      <div class="card__cover">
        <img
          v-if="game.coverUrl && !imageError"
          :src="game.coverUrl"
          :alt="game.title"
          loading="lazy"
          @error="imageError = true"
        />

        <div v-else class="card__cover-placeholder" aria-hidden="true" />
      </div>

      <h3 class="card__title">
        {{ game.title }}
      </h3>
    </RouterLink>

    <div class="card__meta">
      <slot name="meta">
        <Rating :value="game.externalRating" />
      </slot>
    </div>
  </article>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }
}

.card__link {
  display: flex;
  flex-direction: column;
  color: inherit;
  text-decoration: none;

  &:focus-visible {
    outline: none;
    box-shadow: inset var(--focus-ring);
  }
}

.card__cover {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--color-surface-2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card__cover-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-surface-2);
}

.card__title {
  padding: var(--space-4) var(--space-4) 0;
  font-size: var(--font-size-md);
  font-weight: 600;
  line-height: 1.3;
}

.card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4) var(--space-4);
}
</style>
