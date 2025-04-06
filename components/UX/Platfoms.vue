<script setup lang="ts">
import type { PlatformsType } from '~/type/types';

defineProps<{
  platforms: PlatformsType | undefined;
}>();

const route = useRoute();

const fontSize = computed(() => {
  return route.name === 'game-slug' ? '16px' : '12px';
});
</script>

<template>
  <div class="platforms">
    Платформа:
    <div v-for="platform of platforms" class="platforms__platform" :style="{ fontSize: fontSize }">
      {{ platform.platform.name }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.platforms {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  &__platform {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 4px;
    font-size: 12px;
    transition:
      background-color 0.3s,
      color 0.3s;

    &:hover {
      background-color: var(--background-red);
    }

    &:nth-child(1) {
      margin-left: 4px;
    }
  }
}
</style>
