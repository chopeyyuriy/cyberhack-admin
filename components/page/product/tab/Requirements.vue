<template>
  <div class="page-product-tab-requirements">
    <Wrapper :title="`${locale.product.requirementsSystem}:`" :active="true">
      <template #icon>
        <img @dragstart="$event.preventDefault()" src="/images/requirements.svg">
      </template>
      <template #content>
        <PageProductRequirement 
          v-for="(requirement, index) in product.requirements.filter((e) => e.category == 0)"
          :key="index"
          :data="requirement"
        />
      </template>
    </Wrapper>
    <Wrapper :title="`${locale.product.requirementsOther}:`">
      <template #icon>
        <img @dragstart="$event.preventDefault()" src="/images/requirements.svg">
      </template>
      <template #content>
        <PageProductRequirement 
          v-for="(requirement, index) in product.requirements.filter((e) => e.category == 1)"
          :key="index"
          :data="requirement"
        />
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
    const locale = computed(() => store.getters['locale/locale'])

    return { product, locale }
  },
})
</script>
