<script setup lang="ts">
import { useGamesStore } from '@/stores/GamesStore';
import FiltersMain from '~/components/UI/FiltersMain.vue';
import { useGames } from '~/composables/useGames';

const GamesStore = useGamesStore();

const { gameList, refresh } = useGames();
watch(
  () => GamesStore.currentPage,
  () => {
    refresh();
  }
);
</script>

<template>
  <div class="main-page">
    <div>
      <FiltersMain />
    </div>
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
  gap: 2rem;

  &__games {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }
}
</style>
