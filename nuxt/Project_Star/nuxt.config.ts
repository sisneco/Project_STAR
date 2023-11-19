// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    "/": { prerender: false },
    "/login": { ssr: true },
    "/home": { ssr: false },
  },
  modules: ["@nuxtjs/tailwindcss"],

  app: {
    head: {
      link: [
        { rel: "icon", href: "/icon.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@200&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css",
        },
      ],
    },
  },
});
