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
    payload: {
      username: string
      email: string
      password: string
    },
  ): void
}>()

const { t } = useI18n()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = reactive<{
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}>({})

const submitted = ref(false)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  const username = form.username.trim()
  const email = form.email.trim()

  errors.username = !username
    ? t('auth.errors.required')
    : username.length < 3
      ? t('auth.errors.usernameLength')
      : undefined

  errors.email = !email
    ? t('auth.errors.required')
    : !EMAIL_PATTERN.test(email)
      ? t('auth.errors.email')
      : undefined

  errors.password = !form.password
    ? t('auth.errors.required')
    : form.password.length < 8
      ? t('auth.errors.passwordLength')
      : undefined

  errors.confirmPassword = !form.confirmPassword
    ? t('auth.errors.required')
    : form.password !== form.confirmPassword
      ? t('auth.errors.passwordMismatch')
      : undefined

  return (
    !errors.username &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword
  )
}

function onInput() {
  if (submitted.value) {
    validate()
  }
}

function onSubmit() {
  submitted.value = true

  if (!validate()) {
    return
  }

  emit('submit', {
    username: form.username.trim().toLowerCase(),
    email: form.email.trim().toLowerCase(),
    password: form.password,
  })
}
</script>

<template>
  <form
    class="register-form"
    novalidate
    @submit.prevent="onSubmit"
  >
    <p
      v-if="errorMessage"
      class="register-form__error"
      role="alert"
    >
      {{ errorMessage }}
    </p>

    <FormField
      id="register-username"
      :label="t('auth.username')"
      :error="errors.username"
    >
      <template #default="{ describedBy, invalid }">
        <BaseInput
          id="register-username"
          v-model="form.username"
          type="text"
          autocomplete="username"
          :invalid="invalid"
          :aria-describedby="describedBy"
          @update:model-value="onInput"
        />
      </template>
    </FormField>

    <FormField
      id="register-email"
      :label="t('auth.email')"
      :error="errors.email"
    >
      <template #default="{ describedBy, invalid }">
        <BaseInput
          id="register-email"
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
      id="register-password"
      :label="t('auth.password')"
      :error="errors.password"
      :hint="t('auth.passwordHint')"
    >
      <template #default="{ describedBy, invalid }">
        <BaseInput
          id="register-password"
          v-model="form.password"
          type="password"
          autocomplete="new-password"
          :invalid="invalid"
          :aria-describedby="describedBy"
          @update:model-value="onInput"
        />
      </template>
    </FormField>

    <FormField
      id="register-confirm-password"
      :label="t('auth.confirmPassword')"
      :error="errors.confirmPassword"
    >
      <template #default="{ describedBy, invalid }">
        <BaseInput
          id="register-confirm-password"
          v-model="form.confirmPassword"
          type="password"
          autocomplete="new-password"
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
      {{ t('auth.registerSubmit') }}
    </BaseButton>

    <p class="register-form__login">
      {{ t('auth.hasAccount') }}

      <BaseLink to="/login">
        {{ t('auth.login') }}
      </BaseLink>
    </p>
  </form>
</template>

<style scoped lang="scss">
.register-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: 100%;
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
}

.register-form__error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}

.register-form__login {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  text-align: center;
}
</style>
