<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BaseButton from '@/shared/atomic-components/BaseButton.vue'
import Logo from '@/shared/atomic-components/Logo.vue'

const { t } = useI18n()
</script>

<template>
  <main class="welcome-page">
    <section class="welcome-page__content">
      <Logo class="welcome-page__logo" size="lg" />

      <div class="welcome-page__text">
        <h1 class="welcome-page__title">
          {{ t('welcome.title') }}
        </h1>

        <p class="welcome-page__description">
          {{ t('welcome.description') }}
        </p>
      </div>

      <div class="welcome-page__actions">
        <RouterLink to="/login" class="welcome-page__action">
          <BaseButton size="lg" block>
            {{ t('welcome.login') }}
          </BaseButton>
        </RouterLink>

        <RouterLink to="/register" class="welcome-page__action">
          <BaseButton variant="secondary" size="lg" block>
            {{ t('welcome.register') }}
          </BaseButton>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.welcome-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--space-4);
}

.welcome-page__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  width: 100%;
  max-width: 480px;
  text-align: center;
}

.welcome-page__logo {
  margin-bottom: var(--space-2);
}

.welcome-page__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.welcome-page__title {
  font-size: 2rem;
  line-height: 1.15;

  @media (min-width: 768px) {
    font-size: var(--font-size-xl);
  }
}

.welcome-page__description {
  color: var(--color-text-muted);
  line-height: 1.6;
}

.welcome-page__actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}

.welcome-page__action {
  width: 100%;
  color: inherit;
  text-decoration: none;
}
</style>
