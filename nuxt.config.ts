import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  compatibilityDate: "2025-03-02",
  modules: ["nuxt-mdi", "@pinia/nuxt"],
  mdi: {
    componentName: "Icon",
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
    secretKey: process.env.NUXT_SECRET_KEY,
  },
});
