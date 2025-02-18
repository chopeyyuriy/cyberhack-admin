<template>
  <div class="table-row" @click="$emit('click')">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
     return { }
  },
})
</script>
