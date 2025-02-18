<template>
  <div class="progressbar">
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="12" stroke="white" stroke-opacity="0.03" stroke-width="2"/>
      <circle style="transition: .25s" cx="13" cy="13" r="12" stroke="#2D9CDB" stroke-width="2" stroke-dasharray="800" :stroke-dashoffset="800 - 75 * (value / max)"/>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    max: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    }
  },
  setup() {
    return {  }
  },
})
</script>
