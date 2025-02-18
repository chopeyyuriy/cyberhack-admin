<template>
  <div class="table">
    <div class="table-head table-row">
      <slot name="head" />
    </div>
    <div class="table-content">
      <slot name="content" />
    </div>
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
