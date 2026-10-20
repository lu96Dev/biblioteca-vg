<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{ to?: string; href?: string; external?: boolean }>();
</script>

<template>
  <RouterLink v-if="to" :to="to" class="link"><slot /></RouterLink>
  <a
    v-else
    :href="href"
    class="link"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  ><slot /></a>
</template>

<style scoped lang="scss">
.link {
  color: var(--color-text-muted);
  text-decoration: underline;
  text-underline-offset: 3px;
  &:hover { color: var(--color-text); }
}
</style>
