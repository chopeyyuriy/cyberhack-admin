<template>
  <div class="page-product-slider-modal">
    <div @click="$emit('close')" class="page-product-slider-modal__overlay"></div>
    <div @click="$emit('slide:prev')" class="page-product-slider-modal__left">
      <IconArrowLeft />
    </div>
    <img :src="currentImage.image" alt="">
    <div @click="$emit('slide:next')" class="page-product-slider-modal__right">
      <IconArrowLeft />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    currentImage: {
      type: Object
    }
  },
  setup() {
    return {}
  },
})
</script>
