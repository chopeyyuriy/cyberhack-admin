<template>
 <div class="page-product-requirement">
   <div class="page-product-requirement__icon">
    <img @dragstart="$event.preventDefault()" :src="data.type.icon" alt="">
   </div>
   <div class="page-product-requirement__content">
     <p class="label">{{ data.type[`label_${itemLang}`] }}</p>
     <p class="text">{{ data[`text_${itemLang}`] }}</p>
   </div>
 </div>
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

  setup(props) {
    const store = useStore()

    const itemLang = computed(() => store.getters['locale/itemLang'])

    return { itemLang }
  },
})
</script>
