<template>
  <div class="page-home-slider">
    <div class="page-home-slider__content">
      <div class="page-home-slider__controls">
        <div class="page-home-slider__controls-buttons">
          <button @click="prevSlide">
            <IconArrowLeft />
          </button>
          <button @click="nextSlide">
            <IconArrowRight />
          </button>
        </div>
        <div class="page-home-slider__controls__progress-bar">
          <div 
            class="page-home-slider__controls__progress-bar__fill"
            :style="{ width: `${(slideDuration > 0 ? 1 : 0) * 100}%`, transitionDuration: `${!isAnimationProgress ? MAX_SLIDE_DURATION : 0}ms`, transitionTimingFunction: 'linear' }"
          ></div>
        </div>
      </div>
      <div class="page-home-slider__slides">
        <transition name="slider">
          <PageHomeSliderSlide 
            v-if="!isAnimationProgress" 
            :data="currentSlideData" 
          />
        </transition>
      </div>
    </div>
    
    <div class="page-home-slider__games">
      <transition name="slider-game">
        <PageHomeSliderGame 
          v-if="!isAnimationProgress"
          :data="currentSlideData.product"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const MAX_SLIDE_DURATION = 10000
    const SLIDE_DURATION_INTERVAL = 100

    const store = useStore()

    const games = computed(() => store.getters['game/slides'])

    const isAnimationProgress = ref(false)
    const slideDuration = ref(0)
    const currentSlide = ref(0)
    const currentSlideData = computed(() => games.value.find((_: any, index: number) => currentSlide.value == index))

    const setSlide = (value: number) => {
      slideDuration.value = 0
      currentSlide.value = value
      isAnimationProgress.value = true
      setTimeout(() => {
        isAnimationProgress.value = false
      }, 740)
    }

    const nextSlide = () => {
      if (currentSlide.value + 1 < games.value.length)
        setSlide(currentSlide.value + 1)
      else
        setSlide(0)
    }

    const prevSlide = () => {
      if (currentSlide.value - 1 >= 0)
        setSlide(currentSlide.value - 1)
      else
        setSlide(games.value.length - 1)
    }

    setInterval(() => {
      if (slideDuration.value >= MAX_SLIDE_DURATION)
        return nextSlide()
      if (!isAnimationProgress.value)
        return slideDuration.value += SLIDE_DURATION_INTERVAL
      return
    }, SLIDE_DURATION_INTERVAL)

    return { 
      games, 
      currentSlide, 
      currentSlideData, 
      isAnimationProgress, 
      slideDuration, 
      MAX_SLIDE_DURATION,
      prevSlide, 
      nextSlide 
    }
  },
})
</script>
