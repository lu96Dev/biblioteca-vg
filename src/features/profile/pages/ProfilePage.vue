<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import ProfileHeader from '@/features/profile/components/ProfileHeader.vue'
import LibraryPreview from '@/features/profile/components/LibraryPreview.vue'
import { useProfile } from '@/features/profile/composables/useProfile'
import { useLibrary } from '@/features/library/composables/useLibrary'

const { t } = useI18n()
const route = useRoute()
const { profile } = useProfile()
const { entries } = useLibrary()

const profileUsername = computed(() => String(route.params.username))

const ownProfile = computed(
  () => profileUsername.value.toLowerCase() === profile.value.username.toLowerCase(),
)

const libraryIsPrivate = computed(
  () => !ownProfile.value && profile.value.libraryVisibility === 'PRIVATE',
)

const stats = computed(() => ({
  total: entries.value.length,

  playing: entries.value.filter((entry) => entry.status === 'PLAYING').length,

  completed: entries.value.filter((entry) => entry.status === 'COMPLETED').length,

  wantToPlay: entries.value.filter((entry) => entry.status === 'WANT_TO_PLAY').length,

  dropped: entries.value.filter((entry) => entry.status === 'DROPPED').length,
}))

const visibleEntries = computed(() => entries.value.filter((entry) => !entry.hidden))

const previewGames = computed(() => visibleEntries.value.slice(0, 4).map((entry) => entry.game))
</script>

<template>
  <section class="profile-page">
    <ProfileHeader
      :username="profile.username"
      :avatar-url="profile.avatarUrl || undefined"
      :banner-url="profile.bannerUrl || undefined"
      :bio="profile.bio"
      :own-profile="ownProfile"
    />

    <div class="profile-page__content">
      <section class="profile-page__stats" :aria-label="t('profile.statsLabel')">
        <article class="profile-stat">
          <strong class="profile-stat__value">
            {{ stats.total }}
          </strong>

          <span class="profile-stat__label">
            {{ t('profile.stats.total') }}
          </span>
        </article>

        <article class="profile-stat">
          <strong class="profile-stat__value">
            {{ stats.playing }}
          </strong>

          <span class="profile-stat__label">
            {{ t('profile.stats.playing') }}
          </span>
        </article>

        <article class="profile-stat">
          <strong class="profile-stat__value">
            {{ stats.completed }}
          </strong>

          <span class="profile-stat__label">
            {{ t('profile.stats.completed') }}
          </span>
        </article>

        <article class="profile-stat">
          <strong class="profile-stat__value">
            {{ stats.wantToPlay }}
          </strong>

          <span class="profile-stat__label">
            {{ t('profile.stats.wantToPlay') }}
          </span>
        </article>

        <article class="profile-stat">
          <strong class="profile-stat__value">
            {{ stats.dropped }}
          </strong>

          <span class="profile-stat__label">
            {{ t('profile.stats.dropped') }}
          </span>
        </article>
      </section>

      <LibraryPreview :games="previewGames" :private="libraryIsPrivate" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.profile-page {
  width: 100%;
}

.profile-page__content {
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

.profile-page__stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);

  @media (min-width: 600px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

.profile-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 110px;
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-align: center;
}

.profile-stat__value {
  color: var(--color-text);
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
}

.profile-stat__label {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
</style>
