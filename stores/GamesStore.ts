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
      const page = getValidatedPage();
      await updatePage(page);

      topGames.value = await fetchGamesData(page);

      return topGames.value;
    } catch (err) {
      error.value = 'failed to load games.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const getValidatedPage = (): number => {
    const localPage = localStorage.getItem('currentPage');
    return localPage ? Number(localPage) : 1;
  };

  const updatePage = async (page: number): Promise<void> => {
    const router = useRouter();
    await router.push({ query: { page: String(page) } });
    currentPage.value = page;
  };

  const fetchGamesData = async (page: number): Promise<GameType[]> => {
    return await $fetch<GameType[]>('/api/games', {
      query: {
        page: page,
      },
    });
  };

  return {
    topGames,
    loading,
    error,
    getTopGames,
    currentPage,
  };
});
