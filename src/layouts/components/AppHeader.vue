<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Avatar from '@/shared/atomic-components/Avatar.vue'
import Logo from '@/shared/atomic-components/Logo.vue'

const props = withDefaults(
  defineProps<{
    username?: string
    avatarUrl?: string
  }>(),
  {
    username: 'luis',
  },
)

const { t } = useI18n()

const profilePath = computed(() => `/profile/${encodeURIComponent(props.username)}`)
</script>

<template>
  <header class="header">
    <RouterLink to="/games" class="header__logo" :aria-label="t('nav.explore')">
      <Logo size="sm" />
    </RouterLink>

    <nav class="header__nav" :aria-label="t('nav.main')">
      <RouterLink to="/games" class="header__link">
        {{ t('nav.explore') }}
      </RouterLink>

      <RouterLink to="/library" class="header__link">
        {{ t('nav.library') }}
      </RouterLink>

      <RouterLink :to="profilePath" class="header__profile" :aria-label="t('nav.profile')">
        <Avatar :name="username" :src="avatarUrl" size="sm" />

        <span class="header__profile-label">
          {{ t('nav.profile') }}
        </span>
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);

  @media (min-width: 768px) {
    padding: var(--space-3) var(--space-7);
  }
}

.header__logo {
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: var(--space-3);

  @media (min-width: 768px) {
    gap: var(--space-5);
  }
}

.header__link {
  display: inline-flex;
  align-items: center;
  min-height: var(--touch-target);
  color: var(--color-text-muted);
  text-decoration: none;

  &:hover {
    color: var(--color-text);
  }

  &.router-link-active {
    color: var(--color-text);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}

.header__profile {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: var(--touch-target);
  color: var(--color-text-muted);
  text-decoration: none;
  border-radius: var(--radius-md);

  &:hover {
    color: var(--color-text);
  }

  &.router-link-active {
    color: var(--color-text);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}

.header__profile-label {
  display: none;

  @media (min-width: 600px) {
    display: inline;
  }
}
</style>
