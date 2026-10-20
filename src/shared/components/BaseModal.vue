<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

import BaseIcon from '@/shared/atomic-components/BaseIcon.vue'

const props = defineProps<{
  open: boolean
  title: string
  closeLabel: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const dialog = ref<HTMLElement | null>(null)

const titleId = `modal-title-${Math.random().toString(36).slice(2, 8)}`

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

let previous: HTMLElement | null = null

watch(
  () => props.open,
  async (open) => {
    if (open) {
      previous = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'

      await nextTick()

      const first = dialog.value?.querySelector<HTMLElement>(FOCUSABLE)

      ;(first ?? dialog.value)?.focus()
    } else {
      document.body.style.overflow = ''
      previous?.focus()
    }
  },
  { immediate: true },
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.stopPropagation()
    emit('close')
    return
  }

  if (event.key !== 'Tab' || !dialog.value) {
    return
  }

  const items = Array.from(dialog.value.querySelectorAll<HTMLElement>(FOCUSABLE))

  if (items.length === 0) {
    return
  }

  const first = items[0]
  const last = items[items.length - 1]

  if (!first || !last) {
    return
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="modal" @keydown="onKeydown">
      <div class="modal__backdrop" @click="emit('close')" />

      <section
        ref="dialog"
        class="modal__dialog"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        tabindex="-1"
      >
        <header class="modal__header">
          <h2 :id="titleId" class="modal__title">
            {{ title }}
          </h2>

          <button
            type="button"
            class="modal__close"
            :aria-label="closeLabel"
            @click="emit('close')"
          >
            <BaseIcon name="close" />
          </button>
        </header>

        <div class="modal__body">
          <slot />
        </div>

        <footer v-if="$slots.footer" class="modal__footer">
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
}

.modal__dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  width: 100%;
  max-width: 480px;
  max-height: 100%;
  overflow-y: auto;
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  &:focus {
    outline: none;
  }
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.modal__title {
  font-size: var(--font-size-lg);
}

.modal__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--touch-target);
  height: var(--touch-target);
  color: var(--color-text-muted);
  background: none;
  border: 0;
  border-radius: var(--radius-md);

  &:hover {
    color: var(--color-text);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
}

.modal__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}
</style>
