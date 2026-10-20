<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{ name: string; src?: string; size?: number }>(),
  { size: 40 },
);

const failed = ref(false);
watch(() => props.src, () => { failed.value = false; });

const initial = computed(() => props.name.trim().charAt(0).toUpperCase() || '?');
</script>

<template>
  <span class="avatar" :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${size * 0.4}px` }">
    <img v-if="src && !failed" :src="src" :alt="name" @error="failed = true" />
    <span v-else aria-hidden="true">{{ initial }}</span>
  </span>
</template>

<style scoped lang="scss">
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;
  background: var(--color-accent);
  color: #fff;
  font-weight: 700;

  img { width: 100%; height: 100%; object-fit: cover; }
}
</style>
