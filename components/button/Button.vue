<template>
  <component 
    :is="tag" 
    :href="href"
    class="btn"
    :class="`btn_${theme}`"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'a'
    },

    href: {
      type: String,
      default: ''
    },

    theme: {
      type: String,
      default: 'light'
    },
  },

  setup() {
    return { }
  },
})
</script>
