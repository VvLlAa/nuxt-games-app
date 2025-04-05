// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/image'],

  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      API_KEY_GAME: process.env.API_KEY_GAME,
    },
  },
  css: [
      './assets/styles/global.scss'
  ],

  compatibilityDate: '2025-04-04',
})