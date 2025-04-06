// nuxt.config.ts
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/image', '@primevue/nuxt-module'],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      API_KEY_GAME: process.env.API_KEY_GAME,
    },
  },
  css: ['./assets/styles/global.scss', './assets/styles/media.scss'],
  image: {
    provider: 'ipx',
    domains: ['media.rawg.io'],
  },

  compatibilityDate: '2025-04-04',
});
