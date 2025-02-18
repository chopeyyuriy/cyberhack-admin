<template>
  <a :href="`/catalog/${data.path}`" class="game-item">
    <GameLogo :src="data.icon" />
    <div class="game-item__content">
      <p>{{ data[`name_${itemLang}`] }}</p>
      <p v-if="data.price[region]">{{ locale.startWith }}: <span class="price">{{ data.price[region].currency }}{{ data.price[region].cost }}</span></p>
    </div>
    <IconChevron />
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

    return { locale, lang, region, itemLang }
  },
})
</script>
