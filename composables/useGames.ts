import { useGamesStore } from '~/stores/GamesStore';

export const useGames = () => {
  const GamesStore = useGamesStore();

  const {
    data: gameList,
    refresh,
    error,
  } = useAsyncData(
    'top-games',
    async () => {
      return await GamesStore.getTopGames();
    },
    {
      server: true,
    }
  );

  return { gameList, refresh, error };
};
