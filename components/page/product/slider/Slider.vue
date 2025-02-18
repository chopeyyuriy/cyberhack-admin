<template>
  <div class="page-product-slider" @wheel="onMouseWheel">
    <div class="page-product-slider__slides">
      <PageProductSliderSlide 
        v-for="(slide, index) in product.images"
        :style="{ marginLeft: index == 0 ? `calc(${-(100 / 3) * (page * 3)}% - ${20 * page}px)` : 0 }"
        :key="index"
        :src="slide.image"
        @click="selectImage(slide)"
      />
    </div>
    <div class="page-product-slider__controls">
      <div 
        v-for="(slide, index) in Math.ceil(product.images.length / 3)"
        :key="index"
        :class="{ active: page == index }"
        @click="page = index"
        class="page-product-slider__controls-btn"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const product = computed(() => store.getters['game/product'])

    const page = ref(0)
    const currentImage = ref(null)

    const selectImage = (slide: any) => {
      store.commit('modal/OPEN', {
        name: 'slider',
        data: {
          image: slide,
        }
      })
    }

    const onMouseWheel = (event: WheelEvent) => {
      event.preventDefault();

      const maxPage = Math.ceil(product.value.images.length / 3);
      if (event.deltaY >= 0) {
        if (++page.value >= maxPage) page.value = 0;
      } else {
        if (--page.value < 0) page.value = maxPage - 1;
      }
    }

    return { product, page, currentImage, selectImage, onMouseWheel }
  }
})
</script>
