<template>
  <div class="page-purchases-product">
    <div 
      class="page-purchases-product__image"
      :style="{ backgroundImage: `url('${data.game.icon}')` }"
    ></div>
    <div class="page-purchases-product__content">
      <a :href="`/catalog/${data.game.path}/${data.path}`">{{ data[`name_${itemLang}`] }}</a>
      <a :href="`/catalog/${data.game.path}`">{{ data.game[`name_${itemLang}`] }}</a>
    </div>
  </div>
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

    const itemLang = computed(() => store.getters['locale/itemLang'])

    return { itemLang }
  },
})
</script>
