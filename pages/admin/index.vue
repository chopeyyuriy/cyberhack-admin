<template>
  <div class="admin">
    
  </div>
</template>

<script lang="ts">
import {
  defineComponent, useRouter, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',

  middleware: ['admin'],

  setup() {
    const store = useStore()
    const router = useRouter()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      }
    ])

    router.push({ name: 'admin-games' })

    return { }
  },
})
</script>
