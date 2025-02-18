<template>
  <div class="page-home-head">
    <div class="container">
      <div class="page-home-head__content">
        <div class="page-home-head__hint fadeInLeft500ms" style="animation-delay: 150ms">
          <IconHeadHint />
          <p>
            NEXT LEVEL IN GAMING CHEATING
          </p>
        </div>
        <div class="page-home-head__content-title fadeInLeft500ms" style="animation-delay: 250ms">
          <h1>{{ locale.home.head.h1 }}</h1>
        </div>
        <div class="page-home-head__description fadeInLeft500ms" style="animation-delay: 300ms">
          <img src="/images/zigzag_light.png" @dragstart="$event.preventDefault()" alt="">
          <p>{{ locale.home.head.description }}</p>
        </div>
        <div class="page-home-head__buttons fadeInUp500ms" style="animation-delay: 400ms">
          <Button href="/catalog">
            <IconCategory />
            {{ locale.home.head.button.catalog }}
          </Button>
          <Button v-if="!isAuth" href="/signin" theme="dark">
            <IconProfile />
            {{ locale.home.head.button.signin }}
          </Button>
        </div>
      </div>

      <div class="page-home-head__best fadeInRight500ms" style="animation-delay: 500ms">
        <p class="page-home-head__best-text" >{{ locale.home.head.offer }}</p>
        <PageHomeSlider v-if="slides.length" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const locale = computed(() => store.getters['locale/locale'])
    const isAuth = computed(() => store.getters['auth/isAuth'])

    const slides = computed(() => store.getters['game/slides'])
    
    return { locale, isAuth, slides }
  },
})
</script>
