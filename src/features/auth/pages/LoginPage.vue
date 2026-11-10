<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import LoginForm from '@/features/auth/components/LoginForm.vue'
import { useAuth } from '@/features/auth/composables/useAuth'

import Logo from '@/shared/atomic-components/Logo.vue'

import type { LoginPayload } from '@/features/auth/types/auth'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const { login } = useAuth()

const loading = ref(false)
const errorMessage = ref<string>()

function getRedirectPath(): string {
  const redirect = route.query.redirect

  if (typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect
  }

  return '/games'
}

async function handleLogin(credentials: LoginPayload) {
  loading.value = true
  errorMessage.value = undefined

  try {
    login(credentials)

    await router.push(getRedirectPath())
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
      errorMessage.value = t('auth.errors.invalidCredentials')

      return
    }

    errorMessage.value = t('auth.errors.unexpected')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="login-page">
    <div class="login-page__container">
      <Logo class="login-page__logo" size="md" />

      <div class="login-page__heading">
        <h1 class="login-page__title">
          {{ t('auth.loginTitle') }}
        </h1>

        <p class="login-page__description">
          {{ t('auth.loginDescription') }}
        </p>
      </div>

      <LoginForm :loading="loading" :error-message="errorMessage" @submit="handleLogin" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--space-4);
}

.login-page__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
  width: 100%;
  max-width: 440px;
}

.login-page__logo {
  margin-bottom: var(--space-2);
}

.login-page__heading {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  text-align: center;
}

.login-page__title {
  font-size: 2rem;
  line-height: 1.15;
}

.login-page__description {
  color: var(--color-text-muted);
  line-height: 1.5;
}
</style>
