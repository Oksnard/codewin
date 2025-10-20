import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  router: {
    options: {
      strict: false
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  imports: {
    dirs: [
      'composables',
      'utils',
      'stores'
    ]
  },
  modules: [
    '@pinia/nuxt',
    'nuxt-svgo',
  ],
  typescript: {
    strict: false,
    typeCheck: false,
  },
  css: [
    '@/assets/scss/fonts.scss',
    '@/assets/scss/main.scss',
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://api.los-bio.ru' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://api.los-bio.ru',
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '@/assets/scss/abstracts/_mixins' as *; @use '@/assets/scss/abstracts/_variables' as *;",
        },
      },
    },
  },
})
