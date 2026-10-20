<script setup lang="ts">
import BaseLink from '@/shared/atomic-components/BaseLink.vue'

// RAWG exige un enlace activo a su sitio en las pantallas que muestren sus datos.
defineProps<{
  label: string
}>()
</script>

<template>
  <p class="attribution">
    {{ label }}

    <BaseLink
      href="https://rawg.io"
      external
    >
      RAWG
    </BaseLink>
  </p>
</template>

<style scoped lang="scss">
.attribution {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}
</style>
