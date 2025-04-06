<script setup lang="ts">
import type { ShortScreenshotsType } from '~/type/types';

const props = defineProps<{
  images: ShortScreenshotsType[];
}>();

const isHovered = ref(false);
const activeImage = ref<string | null>(null);
const imageUrl = computed(() => props.images[0].image || '/placeholder-game.jpg');

const hoverTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

const handleMouseEnter = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value);
  }

  hoverTimeout.value = setTimeout(() => {
    isHovered.value = true;
  }, 800);

  activeImage.value = null;
};

const handleThumbnailHover = (screenshot: { image: string }) => {
  activeImage.value = screenshot.image;
};

const onMouseLeave = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value);
    hoverTimeout.value = null;
  }
  isHovered.value = false;
  activeImage.value = null;
};
</script>

<template>
  <div @mouseenter="handleMouseEnter" @mouseleave="onMouseLeave" class="carousel">
    <NuxtImg :src="activeImage || imageUrl" alt="Картинка игры" class="carousel__main-image" />
    <div v-if="isHovered" class="carousel__screenshots">
      <NuxtImg
        @mouseenter="handleThumbnailHover(screenshot)"
        v-for="screenshot in images"
        :key="screenshot.image"
        :src="screenshot.image"
        alt="Картинка игры"
        class="carousel__screenshot"
        width="40"
        height="40"
        quality="1"
        format="webp"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel {
  position: relative;
  width: 100%;
  height: 100%;

  &__main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__screenshots {
    display: flex;
    position: absolute;
    flex-direction: row;
    justify-content: space-around;
    bottom: 2px;
    width: 100%;
  }

  &__screenshot {
    position: relative;
    z-index: 100;
  }
}
</style>
