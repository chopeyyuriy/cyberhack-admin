<template>
  <div class="page-title">
    <component :is="tag">
      <slot />
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'h2'
    }
  },

  setup() {
    return { }
  },
})
</script>
