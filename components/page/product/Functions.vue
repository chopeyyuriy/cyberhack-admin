<template>
  <div class="page-product-functions">
    <div 
      class="page-product-functions__item"
      v-for="(func, index) in functions"
      :key="index"
    >
      <img @dragstart="$event.preventDefault()" :src="func.icon" alt="">
      {{ func[`name_${itemLang}`] }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    functions: {
      type: Array,
      default: []
    }
  },

  setup() {
    const store = useStore()
    const itemLang = computed(() => store.getters['locale/itemLang'])
    return { itemLang }
  },
})
</script>
