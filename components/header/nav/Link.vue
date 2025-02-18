<template>
  <a 
    :href="href" 
    :class="{ active }"
    class="header-nav__link"
  >
    <slot />
    <IconLink v-if="external" />
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    href: {
      type: String,
      default: '/'
    },

    external: {
      type: Boolean,
      default: false
    },

    goto: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const router = useRouter()

    const active = computed(() => router.currentRoute.name == props.goto)

    return { active }
  },
})
</script>
