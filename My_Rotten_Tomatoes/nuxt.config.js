export default {
  axios: {
    baseURL: 'http://localhost:8080/api'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth/signin', method: 'post', propertyName: 'data.token' },
          user: false,
          logout: false
        }
      }
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'My_Rotten_Tomatoes',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css' }
    ]
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-vuex-localstorage'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
