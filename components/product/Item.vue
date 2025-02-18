<template>
  <a :href="`/catalog/${data.game.path}/${data.path}`" class="product-item">
    <div 
      class="product-item__image"
      :style="{ backgroundImage: `url('${data.image}')` }"
    ></div>
    <div class="product-item__content">
      <div class="product-item__content-data">
        <p class="name">{{ data[`name_${itemLang}`] }}</p>
        <p class="game">{{ data.game[`name_${itemLang}`] }}</p>
      </div>
      <div class="product-item__content-price">
        <div class="price">{{ locale.startWith }}: <span>{{ data.price[region].currency }}{{ data.price[region].cost }}</span></div>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  setup() {
    const store = useStore()

    const lang = computed(() => store.getters['locale/lang'])
    const locale = computed(() => store.getters['locale/locale'])
    const itemLang = computed(() => store.getters['locale/itemLang'])

    const region = computed(() => lang.value == 'rus' ? 'cis' : 'global')

    return { locale, region, itemLang }
  },
})
</script>
