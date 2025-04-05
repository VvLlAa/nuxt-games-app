<script setup lang="ts">
import { useGamesStore } from '@/stores/GamesStore';

const GamesStore = useGamesStore();

const { data: topGames } = await useAsyncData('top-games', () => GamesStore.getTopGames(), {
  server: true,
});

console.log(topGames.value);
</script>

<template>
  <div class="main-page">
    <GameCard v-for="game in topGames" :key="game.id" :game="game" />
  </div>
</template>

<style lang="scss">
.main-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}
</style>
