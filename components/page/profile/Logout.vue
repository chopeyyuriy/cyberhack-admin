<template>
  <div class="page-profile-logout">
    <div @click="close" class="page-profile-logout__overlay"></div>
    <div class="page-profile-logout__modal">
      <p>{{ locale.logout.text }}</p>
      <div class="page-profile-logout__modal__buttons">
        <Button tag="button" @click="logout">{{ locale.logout.yes }}</Button>
        <Button tag="button" theme="dark" @click="close">{{ locale.logout.no }}</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props) {
    const store = useStore()

    const locale = computed(() => store.getters['locale/locale'])

    const logout = () => {
      close()
      store.dispatch('auth/logout');
      window.location.replace('/')
    }

    const close = () => {
      store.commit('modal/CLOSE', 'logout');
    }

    return { locale, logout, close }
  },
})
</script>
