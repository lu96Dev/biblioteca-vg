<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import BaseButton from '@/shared/atomic-components/BaseButton.vue'
import BaseInput from '@/shared/atomic-components/BaseInput.vue'
import BaseLink from '@/shared/atomic-components/BaseLink.vue'
import FormField from '@/shared/components/FormField.vue'

defineProps<{
  loading?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  (
    e: 'submit',
    credentials: {
      email: string
      password: string
    },
  ): void
}>()

const { t } = useI18n()

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive<{
  email?: string
  password?: string
}>({})

const submitted = ref(false)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  errors.email = !form.email.trim()
    ? t('auth.errors.required')
    : !EMAIL_PATTERN.test(form.email.trim())
      ? t('auth.errors.email')
      : undefined

  errors.password = form.password
    ? undefined
    : t('auth.errors.required')

  return !errors.email && !errors.password
}

function onSubmit() {
  submitted.value = true

  if (!validate()) {
    return
  }

  // El email se normaliza a minúsculas, como en el backend.
  emit('submit', {
    email: form.email.trim().toLowerCase(),
    password: form.password,
  })
}

// Tras el primer intento, los errores se actualizan mientras se escribe.
function onInput() {
  if (submitted.value) {
    validate()
  }
}
</script>

<template>
  <form
    class="login"
    novalidate
    @submit.prevent="onSubmit"
  >
    <h2 class="login__title">
      {{ t('auth.loginTitle') }}
    </h2>

    <p
      v-if="errorMessage"
      class="login__error"
      role="alert"
    >
      {{ errorMessage }}
    </p>

    <FormField
      id="login-email"
      :label="t('auth.email')"
      :error="errors.email"
    >
      <template #default="{ describedBy, invalid }">
        <BaseInput
          id="login-email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          :invalid="invalid"
          :aria-describedby="describedBy"
          @update:model-value="onInput"
        />
      </template>
    </FormField>

    <FormField
      id="login-password"
      :label="t('auth.password')"
      :error="errors.password"
    >
      <template #default="{ describedBy, invalid }">
        <BaseInput
          id="login-password"
          v-model="form.password"
          type="password"
          autocomplete="current-password"
          :invalid="invalid"
          :aria-describedby="describedBy"
          @update:model-value="onInput"
        />
      </template>
    </FormField>

    <BaseButton
      type="submit"
      size="lg"
      block
      :loading="loading"
    >
      {{ t('auth.submit') }}
    </BaseButton>

    <p class="login__register">
      {{ t('auth.noAccount') }}

      <BaseLink to="/register">
        {{ t('auth.register') }}
      </BaseLink>
    </p>
  </form>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: 100%;
  max-width: 400px;
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
}

.login__title {
  font-size: 1.375rem;
}

.login__error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}

.login__register {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  text-align: center;
}
</style>
