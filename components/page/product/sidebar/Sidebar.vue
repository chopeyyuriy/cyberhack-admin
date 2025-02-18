<template>
  <div class="page-product-sidebar">
    <PageProductRates @change="region = $event" />
    <div v-if="region && region.value == 'cis'" class="page-product-sidebar__hint">
      {{ locale.product.attentionCIS }}
    </div>
    <div v-if="region && region.value == 'global'" class="page-product-sidebar__hint">
      {{ globalAttention }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const product = computed(() => store.getters['game/product'])
    const locale = computed(() => store.getters['locale/locale'])

    const region = ref(null)

    const globalAttention = computed(() => {
      if (product.value.game.path === 'PUBG') {
        return locale.value.product.attentionWithouChina;
      }
      return locale.value.product.attentionGlobal;
    });

    return { product, region, locale, globalAttention }
  },
})
</script>
