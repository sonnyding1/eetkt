// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-primevue"],
  css: [
    "primevue/resources/themes/aura-light-green/theme.css",
    "primeicons/primeicons.css",
    "~/assets/css/global.css",
  ],
  plugins: ["~/plugins/primevue-toast.js"],
});
