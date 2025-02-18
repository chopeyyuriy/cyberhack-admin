<template>
  <a target="_blank" class="watch-video" @click="openVideo">
    <div class="watch-video__play">
      <IconPlay />
    </div>
    <div class="watch-video__content">
      <p>{{ locale.video.title }}</p>
      <p>{{ locale.video.action }}</p>
    </div>
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    href: {
      type: String,
      default: ''
    }
  },

  setup() {
    const store = useStore()

    const locale = computed(() => store.getters['locale/locale'])

    return { locale }
  },

  methods: {
    openVideo(event: any) {
      event.preventDefault();

      this.$store.commit('modal/OPEN', {
        name: 'video',
        data: {
          url: this.href,
        }
      })
    }
  }
})
</script>
