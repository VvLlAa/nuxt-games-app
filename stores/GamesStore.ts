import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { GameType } from '~/type/types';

export const useGamesStore = defineStore('games', () => {
  const topGames = ref<GameType[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const currentPage = ref<number>(1);

  const getTopGames = async () => {
    loading.value = true;
    error.value = null;
    try {
      topGames.value = await $fetch<GameType[]>('/api/games', {
        query: {
          page: currentPage.value,
        },
      });

      return topGames.value;
    } catch (err) {
      error.value = 'failed to load games.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    topGames,
    loading,
    error,
    getTopGames,
    currentPage,
  };
});
