<template>
  <div 
    class="input-radio"
    :class="{ active }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return { }
  },
})
</script>
