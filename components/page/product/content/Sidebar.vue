<template>
  <div class="page-product-content__sidebar">
    <div 
      class="page-product__image"
      :style="{ backgroundImage: `url('${product.image}')` }"
    >
      <GameLogo :src="product.game.icon" />
    </div>
    <WatchVideo :href="product.video" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const product = computed(() => store.getters['game/product'])

    return { product }
  },
})
</script>
