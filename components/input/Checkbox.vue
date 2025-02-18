<template>
  <div 
    class="input-checkbox"
    :class="{ active: value }"
    @click="$emit('input', !value)"
  >
    <IconCheck />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return { }
  },
})
</script>
