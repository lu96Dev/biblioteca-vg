<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import BaseButton from '@/shared/atomic-components/BaseButton.vue'
import BaseSelect from '@/shared/atomic-components/BaseSelect.vue'
import BaseToggle from '@/shared/atomic-components/BaseToggle.vue'

import BaseModal from '@/shared/components/BaseModal.vue'
import FormField from '@/shared/components/FormField.vue'
import RatingInput from '@/shared/components/RatingInput.vue'

import type { AddToLibraryPayload, LibraryStatus } from '@/features/library/types/library'
import type { SelectOption } from '@/shared/types/ui'

const props = defineProps<{
  open: boolean
  gameTitle: string
  loading?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: AddToLibraryPayload): void
}>()

const { t } = useI18n()

const form = reactive<AddToLibraryPayload>({
  status: 'PLAYING',
  personalRating: null,
  hidden: false,
})

// Cada vez que se abre, el formulario vuelve a sus valores por defecto.
watch(
  () => props.open,
  (open) => {
    if (open) {
      Object.assign(form, {
        status: 'PLAYING',
        personalRating: null,
        hidden: false,
      })
    }
  },
)

const statusOptions = computed<SelectOption[]>(() =>
  (
    [
      'WANT_TO_PLAY',
      'PLAYING',
      'COMPLETED',
      'DROPPED',
    ] as LibraryStatus[]
  ).map((value) => ({
    value,
    label: t(`library.statusSingle.${value}`),
  })),
)

function onStatusChange(value: string) {
  form.status = value as LibraryStatus
}

function onSubmit() {
  emit('submit', {
    status: form.status,
    personalRating: form.personalRating,
    hidden: form.hidden,
  })
}
</script>

<template>
  <BaseModal
    :open="open"
    :title="t('library.addTitle')"
    :close-label="t('common.close')"
    @close="emit('close')"
  >
    <p class="game-title">
      {{ gameTitle }}
    </p>

    <p
      v-if="errorMessage"
      class="error"
      role="alert"
    >
      {{ errorMessage }}
    </p>

    <FormField
      id="add-status"
      :label="t('library.statusField')"
    >
      <template #default="{ describedBy }">
        <BaseSelect
          id="add-status"
          :model-value="form.status"
          :options="statusOptions"
          :aria-describedby="describedBy"
          @update:model-value="onStatusChange"
        />
      </template>
    </FormField>

    <FormField
      id="add-rating"
      :label="t('library.ratingField')"
    >
      <RatingInput
        id="add-rating"
        v-model="form.personalRating"
        :empty-label="t('library.ratingEmpty')"
        :clear-label="t('library.ratingClear')"
      />
    </FormField>

    <BaseToggle
      v-model="form.hidden"
      :label="t('library.hide')"
    />

    <template #footer>
      <BaseButton
        variant="ghost"
        @click="emit('close')"
      >
        {{ t('common.cancel') }}
      </BaseButton>

      <BaseButton
        :loading="loading"
        @click="onSubmit"
      >
        {{ t('common.save') }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
.game-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.error {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}
</style>
