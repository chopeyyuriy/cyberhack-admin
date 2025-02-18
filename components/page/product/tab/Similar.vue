<template>
  <div class="page-product-tab-similar">
    <ProductItem 
      v-for="(product, index) in similarProducts"
      :key="index"
      :data="product"
    />
    <Empty
      v-if="!similarProducts || similarProducts.length == 0"
      :title="locale.similar.empty.title"
      :text="locale.similar.empty.text"
    >
      <template #icon>
        <IconReceipt />
      </template>
    </Empty>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const similarProducts = computed(() => store.getters['game/similarProducts'])
    const locale = computed(() => store.getters['locale/locale'])

    return { similarProducts, locale }
  },
})
</script>
