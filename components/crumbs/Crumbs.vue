<template>
  <div class="crumbs">
    <a 
      v-for="(crumb, index) in crumbs"
      :key="index"
      :href="crumb.link"
    >
      {{ crumb.label }}
      <span v-if="index != crumbs.length - 1">></span>
    </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const crumbs = computed(() => store.getters['crumbs/path'])

    return { crumbs }
  },
})
</script>
