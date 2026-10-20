<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import BaseButton from '@/shared/atomic-components/BaseButton.vue'
import BaseIcon from '@/shared/atomic-components/BaseIcon.vue'
import Rating from '@/shared/atomic-components/Rating.vue'

import type { GameDetail } from '@/features/catalog/types/game'

const props = defineProps<{
  game: GameDetail
}>()

const emit = defineEmits<{
  (e: 'add'): void
}>()

const { t, locale } = useI18n()

const releaseDate = computed(() => {
  if (!props.game.releaseDate) {
    return ''
  }

  return new Intl.DateTimeFormat(locale.value, {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(`${props.game.releaseDate}T00:00:00Z`))
})

const bannerStyle = computed(() =>
  props.game.backgroundUrl
    ? {
        backgroundImage: `url("${props.game.backgroundUrl}")`,
      }
    : undefined,
)

const subtitle = computed(() =>
  [props.game.developer, releaseDate.value]
    .filter(Boolean)
    .join(' · '),
)
</script>

<template>
  <section class="hero">
    <div
      class="hero__banner"
      :style="bannerStyle"
    />

    <div class="hero__content">
      <div class="hero__cover">
        <img
          v-if="game.coverUrl"
          :src="game.coverUrl"
          alt=""
        />
      </div>

      <div class="hero__info">
        <h1 class="hero__title">
          {{ game.title }}
        </h1>

        <p
          v-if="subtitle"
          class="hero__subtitle"
        >
          {{ subtitle }}
        </p>

        <p
          v-if="game.externalRating != null"
          class="hero__rating"
        >
          <Rating :value="game.externalRating" />

          <span>
            {{ t('game.externalRating') }}
          </span>
        </p>

        <BaseButton
          size="lg"
          @click="emit('add')"
        >
          <BaseIcon
            name="plus"
            :size="18"
          />

          {{ t('game.addToLibrary') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero__banner {
  height: 200px;
  background-color: var(--color-surface-2);
  background-position: center;
  background-size: cover;

  @media (min-width: 768px) {
    height: 280px;
  }
}

.hero__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  max-width: 1200px;
  margin: -72px auto 0;
  padding: 0 var(--space-4);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    gap: var(--space-6);
    margin-top: -90px;
    padding: 0 var(--space-7);
  }
}

.hero__cover {
  flex-shrink: 0;
  width: 160px;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--color-surface);
  border: 4px solid var(--color-bg);
  border-radius: var(--radius-lg);

  @media (min-width: 768px) {
    width: 220px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.hero__info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
  padding-bottom: var(--space-2);
}

.hero__title {
  font-size: 2rem;
  line-height: 1.15;

  @media (min-width: 768px) {
    font-size: var(--font-size-xl);
  }
}

.hero__subtitle {
  color: var(--color-text-muted);
}

.hero__rating {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
</style>
