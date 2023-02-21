// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/line-liff-demo/'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/device',
    ['@pinia/nuxt', {
      autoImports: [
        'defineStore',
        ['defineStore', 'definePiniaStore']
      ]
    }],
    'nuxt-svgo'
  ]
})
