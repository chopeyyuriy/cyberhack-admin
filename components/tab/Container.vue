<template>
  <div class="tab-container-wrapper">
    <button v-if="!!arrows" class="arrows left" @click="onScrollBack">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M15 7L10 12L15 17"
            stroke="#95979F"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
    </button>
    <div class="tab-container">
      <slot />
    </div>
    <button v-if="!!arrows" class="arrows right" @click="onScrollNext">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M10 7L15 12L10 17"
            stroke="#95979F"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    arrows: Boolean,
  },
  setup() {
    return {}
  },
  methods: {
    onScrollBack: () => {
      const container = document.querySelector('.tab-container')
      if (container) {
        container.scrollBy({
          left: -300,
          behavior: 'smooth',
        })
      }
    },
    onScrollNext: () => {
      const container = document.querySelector('.tab-container')
      if (container) {
        container.scrollBy({
          left: 300,
          behavior: 'smooth',
        })
      }
    },
  },
})
</script>
