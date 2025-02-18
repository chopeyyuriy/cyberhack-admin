<template>
  <a :href="href.length ? href : `/catalog/${data.path}`" class="game-card">
    <span v-if="data.is_popular" class="game-card__tag">Popular</span>
    <div 
      class="game-card__image"
      :style="{ backgroundImage: `url('${data.image}')` }"
    >
    </div>
    <div class="game-card__content">
      <GameLogo :src="data.icon" />
      <div class="game-card__content-data">
        <h4>{{ data[`name_${itemLang}`] }}</h4>
        <p v-if="data.price[region]">
          {{ locale.startWith }}: <span class="price">{{ data.price[region].currency }}{{ data.price[region].cost }}</span>
          <span v-if="data.sale" class="sale">save {{ data.sale }}%</span>
        </p>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    href: {
      type: String,
      default: ''
    },

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
