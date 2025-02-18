<template>
  <div class="empty">
    <slot name="icon" />
    <p class="empty-title">{{ title }}</p>
    <p class="empty-text">{{ text }}</p>
    <slot name="action" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },

  setup() {
    return { }
  },
})
</script>
