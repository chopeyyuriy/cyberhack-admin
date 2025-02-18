<template>
  <div class="page-faq-row" :class="{ small }">
    <p v-if="label.length" class="page-faq-row__label">{{ label }}</p>
    <div class="page-faq-row__cards">
      <slot />
    </div>
    <p v-if="description && description.length" class="page-faq-row__description">{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    },

    description: {
      type: String,
      default: ''
    },

    small: {
      type: Boolean,
      default: false
    }
  },
  
  setup() {
    return { }
  },
})
</script>
