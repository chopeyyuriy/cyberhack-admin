<template>
  <div class="page-product-slider-modal">
    <div @click="$emit('close')" class="page-product-slider-modal__overlay"></div>
    <!-- <img :src="currentImage.image" alt=""> -->
    <iframe width="560" height="315" :src="url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    url: {
      type: String
    }
  },
  setup() {
    return {}
  },
})
</script>
