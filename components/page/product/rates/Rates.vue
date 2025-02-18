<template>
  <div class="page-product-rates">
    <div class="page-product-rates__regions" :class="{ 'page-product-rates__regions_single': REGIONS.length < 2 }">
      <PageProductRatesRegion
        v-for="(region, index) in REGIONS"
        :key="index"
        :active="region == currentRegion"
        @click="currentRegion = region; $emit('change', region)"
      >
        <component :is="`IconRegion${region.icon}`" />
        {{ region.label }}
      </PageProductRatesRegion>
    </div>
    <div class="page-product-rates__content" style="padding-bottom: 0">
      <div class="page-product-rates__rates">
        <PageProductRatesRate
          v-for="(rate, index) in product.rates.filter(e => e.region == currentRegion.value)"
          :key="index"
          :data="rate"
          :active="currentRate == rate"
          @click="currentRate = rate"
        />
      </div>
    </div>
    <IconCheckLine style="width: 100%" class="page-product-rates__check" />
    <div class="page-product-rates__content" style="padding-top: 0; margin-top: -5px">
      <div class="page-product-rates__price">
        <div class="text">
          <p>{{ locale.product.toPay }}:</p>
        </div>
        <div class="price">
          <p v-if="currentRate && currentRate.sale" class="price-old">
            {{ currentRate.currency }}{{ currentRate.cost }}
          </p>
          <p v-html="cost" />
        </div>
      </div>
      <ButtonLarge 
        tag="button" 
        @click="goToPay"
        :class="{ disabled: !isTermsConfirmed }"
      >
        {{ locale.product.goToPay }}
      </ButtonLarge>
      <div class="page-product-rates__confirm">
        <InputCheckbox v-model="isTermsConfirmed" />
        <p v-html="locale.product.termsText"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, { emit }) {
    const store = useStore()

    const product = computed(() => store.getters['game/product'])
    const locale = computed(() => store.getters['locale/locale'])

    let REGIONS = [
      {
        label: 'Global Region',
        icon: 'Global',
        value: 'global'
      },
      {
        label: 'CIS Region',
        icon: 'CIS',
        value: 'cis'
      }
    ]

    const availableRegions = new Set(product.value.rates.map((rate: any) => rate.region))
    REGIONS = REGIONS.filter((region) => availableRegions.has(region.value))

    const currentRegion = ref(REGIONS[0] || null);
    emit('change', currentRegion.value)

    const currentRate = ref(product.value.rates.filter((e: any) => e.region == currentRegion.value.value)[0] || null)
    
    watch([product], () => {
      currentRate.value = product.value.rates.filter((e: any) => e.region == currentRegion.value.value)[0] || null
    })

    watch([currentRegion], () => {
      currentRate.value = product.value.rates.filter((e: any) => e.region == currentRegion.value.value)[0] || null
    })

    const cost = computed(() => {
      if (!currentRate.value) return ''

      let value = currentRate.value.currency
      const fixedValue = (currentRate.value.cost * (1 - currentRate.value.sale / 100)).toFixed(2).toString().split('.')

      value += `${fixedValue[0]}<span>.${fixedValue[1]}</span>`

      return value
    })

    const isTermsConfirmed = ref(true)

    const goToPay = () => {
      if (isTermsConfirmed.value) {
        store.commit('modal/OPEN', {
          name: 'payment',
          data: {
            product: product.value,
            rate: currentRate.value
          }
        })
      }
    }

    return { product, REGIONS, currentRegion, currentRate, cost, isTermsConfirmed, locale, goToPay }
  },
})
</script>
