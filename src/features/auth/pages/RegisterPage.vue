<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import RegisterForm from '@/features/auth/components/RegisterForm.vue'
import { useAuth } from '@/features/auth/composables/useAuth'

import Logo from '@/shared/atomic-components/Logo.vue'

import type { RegisterPayload } from '@/features/auth/types/auth'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const { register } = useAuth()

const loading = ref(false)
const errorMessage = ref<string>()

function getRedirectPath(): string {
  const redirect = route.query.redirect

  if (typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect
  }

  return '/games'
}

async function handleRegister(payload: RegisterPayload) {
  loading.value = true
  errorMessage.value = undefined

  try {
    register(payload)

    await router.push(getRedirectPath())
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'EMAIL_ALREADY_EXISTS':
          errorMessage.value = t('auth.errors.emailAlreadyExists')
          return

        case 'USERNAME_ALREADY_EXISTS':
          errorMessage.value = t('auth.errors.usernameAlreadyExists')
          return
      }
    }

    errorMessage.value = t('auth.errors.unexpected')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="register-page">
    <div class="register-page__container">
      <Logo class="register-page__logo" size="md" />

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
