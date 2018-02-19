const bodyParser = require('body-parser')
const session = require('express-session')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'webio',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Zilla+Slab:400,700'
      }
    ]
  },
  plugins: [{src: '~/plugins/buefy.js'},{src: '~/plugins/axios.js'}],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },
  modules: [
    '@nuxtjs/axios'
  ],  
  axios: {
    /**
    proxyHeaders: true,
    credentials: false,
    baseURL: 'http://localhost:8081',
    browserBaseURL: 'http://localhost:8081',
    requestInterceptor: (config, { store }) => {
      if (store.state.token) {
        console.log('store.state')
        config.headers.common['Authorization'] = store.state.token
      }
      return config
    },**/
    init: (axios, context) => {
      console.log(axios.defaults.baseURL)
    }
  },
  /*
  ** Add server middleware
  ** Nuxt.js uses `connect` module as server
  ** So most of express middleware works with nuxt.js server middleware
  */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api'
  ],
}
