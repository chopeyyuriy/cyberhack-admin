<template>
  <a class="product-card">
    <ProductStatus :value="data.status" />
    <div
      class="product-card__image"
      :style="{ backgroundImage: `url('${data.image}')` }"
    ></div>
    <div class="product-card__content">
      <div class="product-card__content-data">
        <h4>{{ data[`name_${itemLang}`] }}</h4>
      </div>
      <div class="product-card__price">
        <p>
          {{ locale.startWith }}:
          <span
            >{{ data.price[region].currency
            }}{{ data.price[region].cost }}</span
          >
        </p>
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
      required: true,
    },
  },

  setup() {
    const store = useStore()

    const lang = computed(() => store.getters['locale/lang'])
    const locale = computed(() => store.getters['locale/locale'])
    const itemLang = computed(() => store.getters['locale/itemLang'])

    const region = computed(() => (lang.value == 'rus' ? 'cis' : 'global'))

    return { locale, region, itemLang }
  },
})
</script>
