<template>
  <div class="page-settings-row">
    <p class="page-settings-row__label">{{ label }}</p>
    <div class="page-settings-row__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    }
  },

  setup() {
    return { }
  },
})
</script>
