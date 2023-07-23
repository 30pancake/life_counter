export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  modules: [
    // Docs: https://tailwindcss.nuxtjs.org
    "@nuxtjs/tailwindcss",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
