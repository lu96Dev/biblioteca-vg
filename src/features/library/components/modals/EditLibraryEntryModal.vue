<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import BaseButton from '@/shared/atomic-components/BaseButton.vue'
import BaseSelect from '@/shared/atomic-components/BaseSelect.vue'
import BaseToggle from '@/shared/atomic-components/BaseToggle.vue'

import BaseModal from '@/shared/components/BaseModal.vue'
import FormField from '@/shared/components/FormField.vue'
import RatingInput from '@/shared/components/RatingInput.vue'

import type {
  AddToLibraryPayload,
  LibraryEntry,
  LibraryStatus,
} from '@/features/library/types/library'

import type { SelectOption } from '@/shared/types/ui'

const props = defineProps<{
  open: boolean
  entry: LibraryEntry
  loading?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: AddToLibraryPayload): void
  (e: 'remove'): void
}>()

const { t } = useI18n()

const confirmingRemoval = ref(false)

const form = reactive<AddToLibraryPayload>({
  status: props.entry.status,
  personalRating: props.entry.personalRating,
  hidden: props.entry.hidden,
})

const modalTitle = computed(() =>
  confirmingRemoval.value ? t('library.removeConfirmTitle') : t('library.editTitle'),
)

const statusOptions = computed<SelectOption[]>(() => [
  {
    value: 'WANT_TO_PLAY',
    label: t('library.statusSingle.WANT_TO_PLAY'),
  },
  {
    value: 'PLAYING',
    label: t('library.statusSingle.PLAYING'),
  },
  {
    value: 'COMPLETED',
    label: t('library.statusSingle.COMPLETED'),
  },
  {
    value: 'DROPPED',
    label: t('library.statusSingle.DROPPED'),
  },
])

watch(
  () => props.open,
  (open) => {
    if (!open) {
      confirmingRemoval.value = false
      return
    }

    form.status = props.entry.status
    form.personalRating = props.entry.personalRating
    form.hidden = props.entry.hidden
    confirmingRemoval.value = false
  },
)

watch(
  () => props.entry,
  (entry) => {
    if (!props.open) {
      return
    }

    form.status = entry.status
    form.personalRating = entry.personalRating
    form.hidden = entry.hidden
    confirmingRemoval.value = false
  },
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

function requestRemoval() {
  confirmingRemoval.value = true
}

function cancelRemoval() {
  confirmingRemoval.value = false
}

function confirmRemoval() {
  emit('remove')
}

function closeModal() {
  confirmingRemoval.value = false
  emit('close')
}
</script>

<template>
  <BaseModal :open="open" :title="modalTitle" :close-label="t('common.close')" @close="closeModal">
    <!-- MODO EDICIÓN -->
    <template v-if="!confirmingRemoval">
      <p class="game-title">
        {{ entry.game.title }}
      </p>

      <p v-if="errorMessage" class="error" role="alert">
        {{ errorMessage }}
      </p>

      <FormField id="edit-status" :label="t('library.statusField')">
        <template #default="{ describedBy }">
          <BaseSelect
            id="edit-status"
            :model-value="form.status"
            :options="statusOptions"
            :aria-describedby="describedBy"
            @update:model-value="onStatusChange"
          />
        </template>
      </FormField>

      <FormField id="edit-rating" :label="t('library.ratingField')">
        <RatingInput
          id="edit-rating"
          v-model="form.personalRating"
          :empty-label="t('library.ratingEmpty')"
          :clear-label="t('library.ratingClear')"
        />
      </FormField>

      <BaseToggle v-model="form.hidden" :label="t('library.hide')" />
    </template>

    <!-- MODO CONFIRMACIÓN DE BORRADO -->
    <div v-else class="remove-confirmation">
      <p class="remove-confirmation__game">
        {{ entry.game.title }}
      </p>

      <p class="remove-confirmation__description">
        {{ t('library.removeConfirmDescription') }}
      </p>

      <p v-if="errorMessage" class="error" role="alert">
        {{ errorMessage }}
      </p>
    </div>

    <!--
      SLOT FOOTER ÚNICO.
      Cambia su contenido según estemos editando
      o confirmando la eliminación.
    -->
    <template #footer>
      <template v-if="confirmingRemoval">
        <BaseButton variant="ghost" :disabled="loading" @click="cancelRemoval">
          {{ t('common.cancel') }}
        </BaseButton>

        <BaseButton class="remove-button" :loading="loading" @click="confirmRemoval">
          {{ t('library.removeConfirmAction') }}
        </BaseButton>
      </template>

      <template v-else>
        <div class="modal-actions">
          <BaseButton
            class="remove-button remove-button--ghost"
            variant="ghost"
            :disabled="loading"
            @click="requestRemoval"
          >
            {{ t('library.remove') }}
          </BaseButton>

          <div class="modal-actions__right">
            <BaseButton variant="ghost" :disabled="loading" @click="closeModal">
              {{ t('common.cancel') }}
            </BaseButton>

            <BaseButton :loading="loading" @click="onSubmit">
              {{ t('common.save') }}
            </BaseButton>
          </div>
        </div>
      </template>
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

.modal-actions {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  width: 100%;
}

.modal-actions__right {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.remove-button {
  color: white;
  background: var(--color-danger);
}

.remove-button:hover {
  filter: brightness(1.08);
}

.remove-button--ghost {
  color: var(--color-danger);
  background: transparent;
}

.remove-button--ghost:hover {
  color: white;
  background: var(--color-danger);
}

.remove-confirmation {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.remove-confirmation__game {
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.remove-confirmation__description {
  color: var(--color-text-muted);
  line-height: 1.5;
}
</style>
