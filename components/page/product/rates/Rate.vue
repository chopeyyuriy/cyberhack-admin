<template>
  <div 
    class="page-product-rates__rate"
    :class="{ active }"
    @click="$emit('click')"
  >
    <div class="page-product-rates__rate-left">
      <InputRadio :active="active" />
      <p>{{ data.period }} {{ period }}
        <span v-if="data.sale">SAVE {{ data.sale }}%</span>
      </p>
    </div>
    <div class="page-product-rates__rate-right">
      <p v-html="cost" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const cost = computed(() => {
      let value = props.data.currency
      const fixedValue = props.data.cost.toFixed(2).toString().split('.')

      value += `${fixedValue[0]}<span>.${fixedValue[1]}</span>`

      return value
    })

    const store = useStore()

    const lang = computed(() => store.getters['locale/lang'])

    const period = computed(() => {
      const period = props.data.period
      const lastDigit = Number.parseInt(period.toString()[period.toString().length - 1])
      
      if (lang.value == 'rus') {
        if ([1].includes(lastDigit)) return 'День'
        if ([2, 3, 4].includes(lastDigit)) return 'Дня'

        return 'Дней'
      } else {
        if (period == 1)
          return 'Day'
      }
      return 'Days'
    })

    return { cost, period }
  },
})
</script>
