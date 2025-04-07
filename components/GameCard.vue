<script setup lang="ts">
import type { GameType } from '~/type/types';
import { useGamesStore } from '~/stores/GamesStore';
import Platfoms from '~/components/UX/Platfoms.vue';
import { dateConversion } from '@/utits/dateConversion';

const GameStore = useGamesStore();

const props = defineProps<{
  game: GameType;
}>();

const formattedGenres = computed(() => props.game.genres.map(g => g.name).join(', '));
</script>

<template>
  <div @click="GameStore.cardOpening(props.game)" class="game-card">
    <div class="game-card__image">
      <NuxtImg :src="game.background_image" alt="Картинка игры" class="game-card__main-image" />

      <div class="game-card__rating">
        {{ game.rating }}
      </div>
    </div>

    <div class="game-card__info">
      <h3>{{ game.name }}</h3>

      <div class="game-card__platforms">
        <Platfoms :platforms="game.parent_platforms" />
        <div class="game-card__additional-content">
          <div>Дата выхода: {{ dateConversion(game.released) }}</div>
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
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 30px rgba(89, 3, 3, 0.4);
    z-index: 10;
  }

  &__main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__image {
    display: flex;
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  &__info {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    position: relative;
    background-color: var(--background);
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
    transition:
      background-color 0.3s,
      color 0.3s;

    &:hover {
      background-color: var(--background-red);
    }
  }

  &__rating {
    position: absolute;
    margin-top: 10px;
    background-color: var(--background-red);
    top: 0;
    padding: 4px;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }

  &__additional-content {
    transition: all 0.2s ease;
    z-index: 10;
    width: 100%;
    background-color: var(--background);
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
    }
    span:hover {
      background-color: var(--background-red);
    }
  }
}
</style>
