<template>
  <div 
    class="game-logo"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <img :src="src" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true
    },

    size: {
      type: Number,
      default: 56
    }
  },

  setup() {
    return { }
  },
})
</script>
