<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Avatar from '@/shared/atomic-components/Avatar.vue'
import Logo from '@/shared/atomic-components/Logo.vue'

const props = defineProps<{
  username?: string
  avatarUrl?: string
}>()

const { t } = useI18n()

const profilePath = computed(() =>
  props.username
    ? `/profile/${encodeURIComponent(props.username)}`
    : undefined,
)
</script>

<template>
  <header class="header">
    <RouterLink
      to="/games"
      class="header__logo"
    >
      <Logo />
    </RouterLink>

    <nav
      class="header__nav"
      :aria-label="t('nav.main')"
    >
      <RouterLink
        to="/games"
        class="header__link"
      >
        {{ t('nav.explore') }}
      </RouterLink>

      <RouterLink
        to="/library"
        class="header__link"
      >
        {{ t('nav.library') }}
      </RouterLink>

      <RouterLink
        v-if="profilePath"
        :to="profilePath"
        class="header__avatar"
        :aria-label="t('nav.profile')"
      >
        <Avatar
          :name="username ?? ''"
          :src="avatarUrl"
        />
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
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);

  @media (min-width: 768px) {
    padding: var(--space-4) var(--space-7);
  }
}

.header__logo {
  text-decoration: none;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.header__link {
  display: inline-flex;
  align-items: center;
  min-height: var(--touch-target);
  color: var(--color-text-muted);
  text-decoration: none;

  &:hover,
  &.router-link-active {
    color: var(--color-text);
  }
}

.header__avatar {
  border-radius: 50%;
}
</style>
