<script setup lang="ts">
import type { GameType } from "~/type/types";

const props = defineProps<{
  game: GameType
}>();

const imageUrl = computed(() => props.game.background_image || '/placeholder-game.jpg');

const releaseDate = computed(() =>
    new Date(props.game.released).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
);

const formattedGenres = computed(() =>
    props.game.genres.map(g => g.name).join(', ')
);

const isHovered = ref(false);
const activeImage = ref<string | null>(null);

const handleMouseEnter = () => {
  isHovered.value = true;
  activeImage.value = null;
};

const handleThumbnailHover = (screenshot: { image: string }) => {
  activeImage.value = screenshot.image;
};

const onMouseLeave = () => {
  isHovered.value = false
  activeImage.value = null;
};

</script>

<template>
  <div
      @mouseenter="handleMouseEnter"
      @mouseleave="onMouseLeave"
      class="game-card"
  >
    <div class="game-card__image">
      <NuxtImg
          :src="activeImage || imageUrl"
          :alt="game.name"
          loading="lazy"
          width="300" height="200"
      />
        <div
            v-if="isHovered"
            class="screenshots"
        >
          <NuxtImg
              @mouseenter="handleThumbnailHover(screenshot)"
              v-for="screenshot in game.short_screenshots"
              :key="screenshot.image"
              :src="screenshot.image"
              :alt="game.name"
              loading="lazy"
              class="screenshot"
          />
        </div>

      <div class="game-card__rating">
        {{ game.rating }}
      </div>
    </div>

    <div class="game-card__info">
      <h2>{{ game.name }}</h2>

      <div class="game-card__platforms">
        <div
            v-for="platform in game.parent_platforms"
            :key="platform.platform.id"
            class="game-card__platform"
        >
          {{ platform.platform.name }}
        </div>

        <div class="game-card__additional-content">
          <div>Дата выхода: {{ releaseDate }}</div>
          <div class="game-card__genres">
            Жанр: <span>{{ formattedGenres }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-card {
  max-width: 300px;
  height: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;

  .screenshots {
    display: flex;
    position: absolute;
    flex-direction: row;
    justify-content: space-around;
    bottom: 2px;
    width: 100%;
  }

  .screenshot {
    position: relative;
    width: 40px;
    height: 40px ;
    z-index: 100;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 30px rgba(89, 3, 3, 0.4);
    z-index: 10;
  }

  &__image {
    display: flex;
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    position: relative;
    background-color: #252525;
    border-radius: 0 0 10px 10px;
  }

  &__platforms {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-top: 10px;
  }

  &__platform {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 4px;
    font-size: 12px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #bb3030;
      color: white;
    }
  }

  &__rating {
    position: absolute;
    margin-top: 10px;
    background-color: #bb3030;
    top: 0;
    padding: 4px;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }

  &__additional-content {
    transition: all 0.2s ease;
    z-index: 10;
    width: 100%;
    background-color: #252525;
    overflow: hidden;
  }

  &__genres {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    span {
      margin-right: 8px;
      padding: 2px 6px;
      background-color: #1d1d1d;
      border-radius: 20px;
      font-size: 12px;
      color: #fff;
    }
    span:hover {
      background-color: #bb3030;
    }
  }
}
</style>
