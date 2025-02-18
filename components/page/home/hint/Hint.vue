<template>
  <div class="page-home-hint">
    <p>{{ locale.home.hint.title }}</p>
    <a href="/catalog">{{ locale.home.hint.toCatalog }}</a>
    <img src="/images/underline_long.svg" alt="">
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const locale = computed(() => store.getters['locale/locale'])
    return { locale }
  },
})
</script>
