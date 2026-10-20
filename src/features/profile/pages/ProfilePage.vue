<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Avatar from '@/shared/atomic-components/Avatar.vue'
import BaseButton from '@/shared/atomic-components/BaseButton.vue'
import BaseInput from '@/shared/atomic-components/BaseInput.vue'
import BaseSelect from '@/shared/atomic-components/BaseSelect.vue'
import BaseTextarea from '@/shared/atomic-components/BaseTextarea.vue'
import FormField from '@/shared/components/FormField.vue'

import type { SelectOption } from '@/shared/types/ui'

type LibraryVisibility = 'PUBLIC' | 'PRIVATE'

interface EditProfileForm {
  username: string
  bio: string
  avatarUrl: string
  bannerUrl: string
  libraryVisibility: LibraryVisibility
}

const { t } = useI18n()
const router = useRouter()

const loading = ref(false)
const errorMessage = ref<string>()
const submitted = ref(false)

// MOCK TEMPORAL.
// Posteriormente vendrá de GET /api/v1/me/profile.
const form = reactive<EditProfileForm>({
  username: 'luis',
  bio: 'RPG, Souls e indie',
  avatarUrl: '',
  bannerUrl: '',
  libraryVisibility: 'PUBLIC',
})

const errors = reactive<{
  username?: string
  bio?: string
  avatarUrl?: string
  bannerUrl?: string
}>({})

const visibilityOptions = computed<SelectOption[]>(() => [
  {
    value: 'PUBLIC',
    label: t('profile.visibility.PUBLIC'),
  },
  {
    value: 'PRIVATE',
    label: t('profile.visibility.PRIVATE'),
  },
])

const bannerStyle = computed(() =>
  form.bannerUrl
    ? {
        backgroundImage: `url("${form.bannerUrl}")`,
      }
    : undefined,
)

function validate(): boolean {
  const username = form.username.trim()

  errors.username = !username
    ? t('auth.errors.required')
    : username.length < 3 || username.length > 50
      ? t('auth.errors.usernameLength')
      : undefined

  errors.bio =
    form.bio.length > 300
      ? t('profile.errors.bioLength')
      : undefined

  errors.avatarUrl =
    form.avatarUrl.length > 1000
      ? t('profile.errors.urlLength')
      : undefined

  errors.bannerUrl =
    form.bannerUrl.length > 1000
      ? t('profile.errors.urlLength')
      : undefined

  return (
    !errors.username &&
    !errors.bio &&
    !errors.avatarUrl &&
    !errors.bannerUrl
  )
}

function onInput() {
  if (submitted.value) {
    validate()
  }
}

function onVisibilityChange(value: string) {
  form.libraryVisibility = value as LibraryVisibility
}

function cancel() {
  router.back()
}

function onSubmit() {
  submitted.value = true
  errorMessage.value = undefined

  if (!validate()) {
    return
  }

  const payload = {
    username: form.username.trim().toLowerCase(),
    bio: form.bio.trim(),
    avatarUrl: form.avatarUrl.trim(),
    bannerUrl: form.bannerUrl.trim(),
    libraryVisibility: form.libraryVisibility,
  }

  console.log('Actualizar perfil:', payload)

  // Más adelante:
  //
  // loading.value = true
  //
  // try {
  //   await profileService.updateProfile(payload)
  //   router.push(`/profile/${payload.username}`)
  // } catch (error) {
  //   errorMessage.value = ...
  // } finally {
  //   loading.value = false
  // }
  //
  // PATCH /api/v1/me/profile
}
</script>

<template>
  <section class="edit-profile-page">
    <header class="edit-profile-page__header">
      <div>
        <h1 class="edit-profile-page__title">
          {{ t('profile.editTitle') }}
        </h1>

        <p class="edit-profile-page__description">
          {{ t('profile.editDescription') }}
        </p>
      </div>
    </header>

    <section class="edit-profile-page__preview">
      <div
        class="edit-profile-page__banner"
        :style="bannerStyle"
      />

      <div class="edit-profile-page__avatar">
        <Avatar
          :name="form.username"
          :src="form.avatarUrl || undefined"
        />
      </div>
    </section>

    <form
      class="edit-profile-page__form"
      novalidate
      @submit.prevent="onSubmit"
    >
      <p
        v-if="errorMessage"
        class="edit-profile-page__error"
        role="alert"
      >
        {{ errorMessage }}
      </p>

      <FormField
        id="profile-username"
        :label="t('profile.username')"
        :error="errors.username"
      >
        <template #default="{ describedBy, invalid }">
          <BaseInput
            id="profile-username"
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
        id="profile-bio"
        :label="t('profile.bioField')"
        :error="errors.bio"
        :hint="t('profile.bioHint')"
      >
        <template #default="{ describedBy, invalid }">
          <BaseTextarea
            id="profile-bio"
            v-model="form.bio"
            :invalid="invalid"
            :aria-describedby="describedBy"
            :maxlength="300"
            @update:model-value="onInput"
          />
        </template>
      </FormField>

      <FormField
        id="profile-avatar-url"
        :label="t('profile.avatarUrl')"
        :error="errors.avatarUrl"
      >
        <template #default="{ describedBy, invalid }">
          <BaseInput
            id="profile-avatar-url"
            v-model="form.avatarUrl"
            type="url"
            :invalid="invalid"
            :aria-describedby="describedBy"
            @update:model-value="onInput"
          />
        </template>
      </FormField>

      <FormField
        id="profile-banner-url"
        :label="t('profile.bannerUrl')"
        :error="errors.bannerUrl"
      >
        <template #default="{ describedBy, invalid }">
          <BaseInput
            id="profile-banner-url"
            v-model="form.bannerUrl"
            type="url"
            :invalid="invalid"
            :aria-describedby="describedBy"
            @update:model-value="onInput"
          />
        </template>
      </FormField>

      <FormField
        id="profile-library-visibility"
        :label="t('profile.libraryVisibility')"
      >
        <template #default="{ describedBy }">
          <BaseSelect
            id="profile-library-visibility"
            :model-value="form.libraryVisibility"
            :options="visibilityOptions"
            :aria-describedby="describedBy"
            @update:model-value="onVisibilityChange"
          />
        </template>
      </FormField>

      <div class="edit-profile-page__actions">
        <BaseButton
          type="button"
          variant="ghost"
          :disabled="loading"
          @click="cancel"
        >
          {{ t('common.cancel') }}
        </BaseButton>

        <BaseButton
          type="submit"
          :loading="loading"
        >
          {{ t('common.save') }}
        </BaseButton>
      </div>
    </form>
  </section>
</template>

<style scoped lang="scss">
.edit-profile-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);

  @media (min-width: 768px) {
    padding: var(--space-7);
  }
}

.edit-profile-page__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.edit-profile-page__title {
  font-size: 2rem;
  line-height: 1.15;
}

.edit-profile-page__description {
  max-width: 640px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.edit-profile-page__preview {
  position: relative;
  padding-bottom: 40px;
}

.edit-profile-page__banner {
  width: 100%;
  height: 180px;
  background-color: var(--color-surface-2);
  background-position: center;
  background-size: cover;
  border-radius: var(--radius-lg);

  @media (min-width: 768px) {
    height: 220px;
  }
}

.edit-profile-page__avatar {
  position: absolute;
  bottom: 0;
  left: var(--space-5);
}

.edit-profile-page__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
}

.edit-profile-page__error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}

.edit-profile-page__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-2);
}
</style>
