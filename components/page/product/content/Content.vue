<template>
  <div class="page-product-content">    
    <PageProductContentSidebar />
    <div class="page-product-content__data">
      <div class="page-product__title">
        <div class="page-product__title-container">
          <h2>{{ product.game[`name_${itemLang}`] }}</h2>
          <h1>{{ product[`name_${itemLang}`] }}</h1>
        </div>
        <ProductStatus :value="product.status" />
      </div>
      <PageProductFunctions :functions="product.functions" />
      <PageProductContentDescription>
        {{ product[`description_${itemLang}`] }}
      </PageProductContentDescription>
      <PageProductSlider />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const itemLang = computed(() => store.getters['locale/itemLang'])
    const product = computed(() => store.getters['game/product'])

    return { product, itemLang }
  },
})
</script>
