import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { GameType } from '~/type/types';

export const useGamesStore = defineStore('games', () => {
  const gameList = ref<GameType[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const currentPage = ref<number>(1);
  const currentGame = ref<GameType | null>(null);

  const router = useRouter();

  const getTopGames = async () => {
    loading.value = true;
    error.value = null;
    try {
      const page = getValidatedPage();
      await updatePage(page);

      gameList.value = await fetchGamesData(page);

      return gameList.value;
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

  // --------------------------------------------------------

  const cardOpening = async (cardGame: GameType) => {
    currentGame.value = cardGame;
    localStorage.setItem('cardGame', JSON.stringify(currentGame.value));
    await router.push(`/game/${cardGame.slug}`);
  };

  return {
    gameList,
    loading,
    error,
    getTopGames,
    currentPage,
    cardOpening,
    currentGame,
  };
});
