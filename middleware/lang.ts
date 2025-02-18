import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(({ store, redirect, route }) => {
  if (route.params.lang)
    store.commit('locale/SET_LOCALE', route.params.lang)
})
