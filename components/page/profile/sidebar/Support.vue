<template>
  <div class="page-profile-sidebar__support">
    <transition name="fade">
      <PageTicketCreateModal 
        v-if="ticketCreateModal.show" 
        :data="ticketCreateModal.data" 
        @close="$store.commit('modal/CLOSE', 'ticketCreate')"
      />
    </transition>
    
    <div class="page-profile-sidebar__support-title">
      <p>{{ locale.profile.support }}</p>
      <img @dragstart="$event.preventDefault()" src="/images/underline.svg" alt="">
    </div>
    <div class="page-profile-sidebar__support-avatar">
      <div class="image">
        <img @dragstart="$event.preventDefault()" src="/images/user/avatar.png" alt="">
      </div>
      <p v-html="locale.profile.bot"></p>
    </div>
    <div class="page-profile-sidebar__support-text">
      <p>{{ locale.profile.help }}</p>
    </div>
    <Button tag="button" @click="$store.commit('modal/OPEN', { name: 'ticketCreate', data: {} })">
      <IconChat />
      {{ locale.profile.openTicket }}
    </Button>
    <div class="page-profile-sidebar__support-hint">
      <p v-html="locale.profile.responseTime"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const user = computed(() => store.getters['auth/user'])
    const locale = computed(() => store.getters['locale/locale'])

    const ticketCreateModal = computed(() => store.getters['modal/ticketCreate'])

    return { user, locale, ticketCreateModal }
  },
})
</script>
