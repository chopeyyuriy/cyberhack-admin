<template>
  <div class="page-product-description">
    <div class="page-product-description__tabs">
      <PageProductDescriptionTab
        v-for="(tab, index) in Object.keys(TABS)"
        :key="index"
        :active="currentTab == tab"
        @click="currentTab = tab"
      >
        <component :is="TABS[tab].icon" />
        {{ TABS[tab].title }}
      </PageProductDescriptionTab>
    </div>
    <div class="page-product-description__content">
      <PageProductTabFunctions v-show="currentTab == 'functions'" />
      <PageProductTabRequirements v-show="currentTab == 'system_requirements'" />
      <PageProductTabSimilar v-show="currentTab == 'items'" />
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

    const TABS = computed(() => locale.value.product.tabs)

    const currentTab = ref('functions')

    return { product, TABS, currentTab }
  },
})
</script>
