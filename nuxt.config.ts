// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.scss"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxt/content", "@nuxt/image"],

  app:{
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },

  nitro: {
    esbuild: {
      options: {
        target: "esnext", // supports top level await
      },
    },
  },

  compatibilityDate: "2024-09-05",
});