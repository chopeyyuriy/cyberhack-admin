<template>
  <div class="page-profile-sidebar__ticket">
    <h2>{{ locale.ticket.title }}</h2>
    <img src="/images/underline.svg" @dragstart="$event.preventDefault()" />
    <p>{{ locale.ticket.text }}</p>
    <Button v-if="!ticket.status" tag="button" @click="closeTicket">{{ locale.ticket.close }}</Button>
    <Button v-else href="/profile/tickets">{{ locale.ticket.gotoTickets }}</Button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const user = computed(() => store.getters['auth/user'])
    const locale = computed(() => store.getters['locale/locale'])
    const ticket = computed(() => store.getters['ticket/ticket'])

    return { user, locale, ticket }
  },

  methods: {
    async closeTicket() {
      await this.$store.dispatch('ticket/closeTicket')
      let event = new Event('ticket:close');
      document.dispatchEvent(event);
      
      this.$nextTick(() => {
        window.location.replace('/profile/tickets')
      })
    }
  }
})
</script>
