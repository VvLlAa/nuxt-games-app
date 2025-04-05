import { ApiResponse, GameType } from '~/type/types';

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const page = query.page ? parseInt(query.page as string) : 1;

  try {
    const data = await $fetch<ApiResponse<GameType>>('https://api.rawg.io/api/games', {
      params: {
        key: config.public.API_KEY_GAME,
        page_size: 15,
        page: page,
      },
    });
    return data.results;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch games',
    });
  }
});
