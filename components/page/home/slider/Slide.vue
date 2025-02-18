<template>
  <div class="page-home-slider__slide">
    <img 
      :src="data.image" 
      :alt="data.name_en" 
      @dragstart="$event.preventDefault()"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  setup() {
    return { }
  },
})
</script>
