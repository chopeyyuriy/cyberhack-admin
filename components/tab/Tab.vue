<template>
  <div 
    class="tab"
    :class="{ active }"
    @click="$emit('click')"
  >
    <slot />
  </div>
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
