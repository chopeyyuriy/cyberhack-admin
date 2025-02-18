import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(({ store, redirect }) => {
  const isAuth = store.getters['auth/isAuth']
  const user = store.getters['auth/user']
  if (!isAuth || !user.adminlvl || user.adminlvl < 2) {
    redirect('/admin/auth')
  }
})
