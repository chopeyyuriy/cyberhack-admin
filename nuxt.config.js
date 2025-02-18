export default {
  render: {
    csp: false,
  },
  dev: process.env.NODE_ENV !== 'production',
  ssr: true,
  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  loading: false,
  head: {
    title: 'Приватные Читы – Ваш путь к доминированию в игре',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles/include.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/axios',
    '~plugins/storage',
    '~plugins/animejs',
    { src: '~plugins/vue2-editor', mode: 'client' },
    { src: '~plugins/vue-notification', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/google-fonts',
    'nuxt-animejs',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    '@nuxt/image',
    'vue-toastification/nuxt',
    'nuxt-socket-io',
    [
      '@rkaliev/nuxtjs-yandex-metrika',
      {
        id: 83734714,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      },
    ],
  ],

  publicRuntimeConfig: {
    yandexMetrika: {
      id: 82143082,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    },
    contacts: {
      mail: '',
    },
  },

  sitemap: {
    exclude: ['/admin/**'],
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
    },
  },

  translator: {
    baseUrl:
      process.env.NODE_ENV !== 'production'
        ? 'http://127.0.0.1:3334/translator'
        : 'https://crooked-arms.shop/translator',
  },

  robots: {
    UserAgent: '*',
    Disallow: '/admin/',
    Sitemap:
      process.env.NODE_ENV !== 'production'
        ? 'http://127.0.0.1:3333/sitemap.xml'
        : 'https://crooked-arms.store/sitemap.xml',
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: false,
    baseURL:
      process.env.NODE_ENV !== 'production'
        ? 'https://cyberhack.pro/'
        : 'https://cyberhack.pro/',
  },

  io: {
    // module options
    sockets: [
      {
        name: 'main',
        default: true,
        url: 'http://localhost:3334',
        vuex: {},
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend: (config) => {
      config.module.rules.push({
        test: /.scss$/,
        use: 'webpack-import-glob-loader',
      })
    },
  },

  googleFonts: {
    download: true,
    inject: true,
    /* overwriting: true, */
    families: {
      Montserrat: [400, 500, 600, 700, 800, 900],
    },
  },

  generate: {
    interval: 2000,
  },
}
