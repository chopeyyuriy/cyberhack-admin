<template>
  <div class="page-profile-email-modal__container">
    <div class="page-profile-email-modal__overlay" @click="close"></div>
    <div class="page-profile-email-modal">
      <div class="page-profile-email-modal__content">
        <div class="page-profile-email-modal__title">
          <h3>Подтвердить почту</h3>
          <img @dragstart="$event.preventDefault()" src="/images/underline.svg" alt="">
        </div>
        <div class="page-profile-email-modal__description">
          <p>Мы выслали вам код подтверждения на почту, введите код или перейдите по ссылке!</p>
        </div>
        <Button>Подтвердить</Button> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    data: {
      type: Object,
    }
  },

  setup(props) {
    const store = useStore()


    return { }
  },
})
</script>
