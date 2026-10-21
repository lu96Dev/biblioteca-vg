<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Avatar from '@/shared/atomic-components/Avatar.vue'
import BaseButton from '@/shared/atomic-components/BaseButton.vue'

const props = defineProps<{
  username: string
  avatarUrl?: string
  bannerUrl?: string
  bio?: string
  ownProfile?: boolean
}>()

const { t } = useI18n()

const bannerStyle = computed(() =>
  props.bannerUrl
    ? {
        backgroundImage: `url("${props.bannerUrl}")`,
      }
    : undefined,
)
</script>

<template>
  <section class="profile-header">
    <div class="profile-header__visual">
      <div class="profile-header__banner" :style="bannerStyle" />

      <Avatar class="profile-header__avatar" :name="username" :src="avatarUrl" size="lg" />
    </div>

    <div class="profile-header__content">
      <div class="profile-header__heading">
        <div>
          <h1 class="profile-header__username">@{{ username }}</h1>

          <p v-if="bio" class="profile-header__bio">
            {{ bio }}
          </p>
        </div>

        <RouterLink v-if="ownProfile" to="/profile/edit" class="profile-header__edit-link">
          <BaseButton variant="secondary">
            {{ t('profile.edit') }}
          </BaseButton>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.profile-header {
  width: 100%;
}

.profile-header__visual {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header__banner {
  width: 100%;
  height: 200px;
  background-color: var(--color-surface-2);
  background-position: center;
  background-size: cover;
  border-radius: var(--radius-lg);

  @media (min-width: 768px) {
    height: 280px;
  }
}

.profile-header__avatar {
  position: absolute;

  /*
   * Lo colocamos en la parte inferior izquierda
   * y hacemos que sobresalga del banner.
   */
  bottom: -72px;
  left: var(--space-4);

  z-index: 1;

  @media (min-width: 768px) {
    left: var(--space-7);
  }
}

.profile-header__content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  /*
   * 72px corresponden aproximadamente a la mitad
   * del avatar de 144px.
   */
  padding:
    calc(72px + var(--space-5))
    var(--space-4)
    0;

  @media (min-width: 768px) {
    padding:
      calc(72px + var(--space-5))
      var(--space-7)
      0;
  }
}

.profile-header__heading {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.profile-header__username {
  font-size: 2rem;
  line-height: 1.15;
}

.profile-header__bio {
  max-width: 680px;
  margin-top: var(--space-2);
  color: var(--color-text-muted);
  line-height: 1.5;
}

.profile-header__edit-link {
  flex-shrink: 0;
  color: inherit;
  text-decoration: none;
}
</style>
