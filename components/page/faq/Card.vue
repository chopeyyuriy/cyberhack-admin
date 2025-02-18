<template>
  <div class="page-faq-card">
    <div class="page-faq-card__content">
      <div 
        class="page-faq-card__icon"
        :style="{ backgroundImage: `url('${icon}')` }"
      ></div>
      <div class="page-faq-card__content-data">
        <p class="page-faq-card__content-title">{{ title }}</p>
        <p v-if="label && label.length" class="page-faq-card__content-label">{{ label }}</p>
      </div>
    </div>
    <a :href="link" target="_blank">{{ button.length === 0 ? locale.faq.download : button }}</a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: ''
    },

    button: {
      type: String,
      default: ''
    }
  },
  
  setup() {
    const store = useStore()

    const locale = computed(() => store.getters['locale/locale'])

    return { locale }
  },
})
</script>
