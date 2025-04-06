<script setup lang="ts">
import { useGamesStore } from '@/stores/GamesStore';

const GamesStore = useGamesStore();

const { data: gameList, refresh } = await useAsyncData(
  'top-games',
  async () => {
    return await GamesStore.getTopGames();
  },
  {
    server: true,
  }
);

watch(
  () => GamesStore.currentPage,
  () => {
    refresh();
  }
);
</script>

<template>
  <div class="main-page">
    <div class="main-page__games">
      <GameCard v-for="game in gameList" :key="game.id" :game="game" />
    </div>
    <Pagination />
  </div>
</template>

<style lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__games {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }
}
</style>
