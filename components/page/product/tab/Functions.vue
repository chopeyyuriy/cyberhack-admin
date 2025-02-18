<template>
  <div class="page-product-tab-functions">
    <Wrapper 
      v-for="(func, index) in product.functions"
      :key="index"
      :title="func[`name_${itemLang}`]"
      :active="index == 0"
    >
      <template #icon>
        <img @dragstart="$event.preventDefault()" :src="func.icon" :alt="func.name">
      </template>
      <template #content>
        <p v-html="func[`content_${itemLang}`].split('\n').join('<br>')" />
      </template>
    </Wrapper>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const product = computed(() => store.getters['game/product'])
    const itemLang = computed(() => store.getters['locale/itemLang'])

    return { product, itemLang }
  },
})
</script>
