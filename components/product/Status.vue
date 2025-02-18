<template>
  <div class="product-status" :class="STATUSES[value].class">
    <IconStatus />
    {{ STATUSES[value].label }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0
    }
  },

  setup() {
    const STATUSES = [
      {
        label: 'Updating',
        class: 'updating'
      },
      {
        label: 'Detected',
        class: 'detected'
      },
      {
        label: 'Undetected',
        class: 'undetected'
      },
      {
        label: 'Testing',
        class: 'updating'
      },
      {
        label: 'Use at risk',
        class: 'detected'
      }
    ]
    return { STATUSES }
  },
})
</script>
