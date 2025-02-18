<template>
  <div 
    class="page-product-slide"
    :style="{ backgroundImage: `url('${src}')` }"
    @click="$emit('click')"
  >
    <div class="page-product-slide__icon">
      <IconSearchPlus />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    src: {
      type: String,
      default: ''
    }
  },

  setup() {
    return { }
  },
})
</script>
