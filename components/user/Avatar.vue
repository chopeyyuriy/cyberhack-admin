<template>
  <div 
    class="user-avatar"
    :style="{ backgroundImage: `url('${src}')`, width: `${size}px`, height: `${size}px` }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    src: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 48
    }
  },

  setup() {
    return { }
  },
})
</script>
