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
    <div
      class="profile-header__banner"
      :style="bannerStyle"
    />

    <div class="profile-header__content">
      <Avatar
        class="profile-header__avatar"
        :name="username"
        :src="avatarUrl"
      />

      <div class="profile-header__info">
        <div class="profile-header__heading">
          <div>
            <h1 class="profile-header__username">
              @{{ username }}
            </h1>

            <p
              v-if="bio"
              class="profile-header__bio"
            >
              {{ bio }}
            </p>
          </div>

          <RouterLink
            v-if="ownProfile"
            to="/profile/edit"
            class="profile-header__edit-link"
          >
            <BaseButton variant="secondary">
              {{ t('profile.edit') }}
            </BaseButton>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.profile-header {
  width: 100%;
}

.profile-header__banner {
  width: 100%;
  height: 180px;
  background-color: var(--color-surface-2);
  background-position: center;
  background-size: cover;

  @media (min-width: 768px) {
    height: 240px;
  }
}

.profile-header__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    gap: var(--space-5);
    padding: 0 var(--space-7);
  }
}

.profile-header__avatar {
  margin-top: -48px;

  @media (min-width: 768px) {
    margin-top: -64px;
  }
}

.profile-header__info {
  flex: 1;
  padding-top: var(--space-3);

  @media (min-width: 768px) {
    padding-bottom: var(--space-2);
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
