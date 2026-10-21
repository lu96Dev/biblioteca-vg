<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import RegisterForm from '@/features/auth/components/RegisterForm.vue'
import Logo from '@/shared/atomic-components/Logo.vue'

const { t } = useI18n()

const loading = ref(false)
const errorMessage = ref<string>()

function handleRegister(payload: { username: string; email: string; password: string }) {
  console.log('Registro:', payload)

  // TEMPORAL:
  // Aquí conectaremos más adelante:
  //
  // authStore.register(payload)
  //        ↓
  // auth.service.ts
  //        ↓
  // POST /api/v1/auth/register
}
</script>

<template>
  <section class="register-page">
    <div class="register-page__container">
      <Logo class="login-page__logo" size="lg" />

      <div class="register-page__heading">
        <h1 class="register-page__title">
          {{ t('auth.registerTitle') }}
        </h1>

        <p class="register-page__description">
          {{ t('auth.registerDescription') }}
        </p>
      </div>

      <RegisterForm :loading="loading" :error-message="errorMessage" @submit="handleRegister" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--space-4);
}

.register-page__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
  width: 100%;
  max-width: 440px;
}

.register-page__logo {
  margin-bottom: var(--space-2);
}

.register-page__heading {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  text-align: center;
}

.register-page__title {
  font-size: 2rem;
  line-height: 1.15;
}

.register-page__description {
  color: var(--color-text-muted);
  line-height: 1.5;
}
</style>
