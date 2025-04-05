import {ApiResponse, GameType} from "~/type/types";

export default defineEventHandler(async () => {
    const config = useRuntimeConfig();
    try {
        const data = await $fetch<ApiResponse<GameType>>('https://api.rawg.io/api/games', {
            params: {
                key: config.public.API_KEY_GAME,
                page_size: 50,
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