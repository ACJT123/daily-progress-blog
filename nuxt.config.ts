import Aura from "@primevue/themes/aura";
import { inject } from "@vercel/analytics";

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

  modules: ["@nuxt/image", "@primevue/nuxt-module"],

  nitro: {
    esbuild: {
      options: {
        target: "esnext", // supports top level await
      },
    },
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  compatibilityDate: "2024-09-05",

  // inject
  hooks: {
    ready: () => {
      inject(); // Vercel analytics will be injected when the app is ready
    },
  },
});
