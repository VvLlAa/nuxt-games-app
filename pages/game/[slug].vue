<script setup lang="ts">
import { ref } from 'vue';

import { useGamesStore } from '~/stores/GamesStore';
import type { GameType } from '~/type/types';
import Platfoms from '~/components/UX/Platfoms.vue';
import { dateConversion } from '~/utits/dateConversion';
import GalleriaPrimeVue from '~/components/UI/GalleriaPrimeVue.vue';

const GamesStore = useGamesStore();
const game = ref<GameType>(GamesStore.currentGame as GameType);

console.log(game.value);
</script>

<template>
  <div class="card-game">
    <div
      class="card-game__background"
      :style="{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${game?.background_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: '-1',
      }"
    ></div>

    <div class="card-game__image">
      <GalleriaPrimeVue :game="game?.short_screenshots" />
    </div>

    <div class="card-game__content">
      <h1>
        {{ game?.name }}
      </h1>
      <div class="card-game__platforms">
        <Platfoms :platforms="game?.parent_platforms" />
      </div>
      <div>Дата выхода: {{ dateConversion(game?.released) }}</div>
      <div>Рейтинг: {{ game?.rating }}</div>
      <div class="card-game__tags">
        Теги:
        <div v-for="tag in game?.tags" class="card-game__tag">{{ tag.name }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card-game {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;

  &__image {
    .galleria-image {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
  &__content {
    display: flex;
    flex-flow: column;
    gap: 0.6rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
    .card-game__tag {
      border: 1px solid #fff;
      padding: 4px;
      border-radius: 8px;
      cursor: pointer;

      &:first-child {
        margin-left: 4px;
      }

      &:hover {
        background-color: var(--background-red);
      }
    }
  }
}
</style>
