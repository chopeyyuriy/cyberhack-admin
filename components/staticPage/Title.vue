<template>
  <div class="static-page-title">
    <p>Crooked Arm’s</p>
    <component :is="tag">
      <slot />
    </component>
    <img @dragstart="$event.preventDefault()" src="/images/underline.svg" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'h1'
    }
  },

  setup() {
    return { }
  },
})
</script>
