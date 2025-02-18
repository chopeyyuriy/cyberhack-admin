<template>
  <a :href="`/catalog/${data.game.path}/${data.path}`" class="page-home-slider__game">
    <GameLogo style="filter: invert(1)" :src="data.game.icon" />
    <div class="page-home-slider__game-content">
      <h3>{{ data[`name_${itemLang}`] }}</h3>
      <p v-if="data.price[region]">{{ locale.startWith }}: <span>{{ data.price[region].currency }}{{ data.price[region].cost }}</span></p>
    </div>
    <IconArrowGo />
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
