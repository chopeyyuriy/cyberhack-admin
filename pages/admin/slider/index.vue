<template>
  <div class="admin-games">
    <a href="/admin/slider/create" class="admin-action">Создать слайд</a>
    
    <CatalogCards style="margin-top: 0">
      <ProductCard
        v-for="(slide, index) in slides"
        :key="index"
        :data="slide.product"
        :href="`/admin/slider/${slide.id}`"
      />
    </CatalogCards>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  async asyncData({ $axios }) {
    const slides = (await $axios.get('/api/slides')).data
    
    return {
      slides
    }
  },

  setup() {
    const store = useStore()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Слайды',
        link: '/admin/slides'
      }
    ])

    return { }
  },
})
</script>
