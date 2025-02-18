<template>
  <div class="page-profile-sidebar">
    <div class="page-profile-sidebar__card">
      <UserAvatar :src="user.avatar" />
      <div class="page-profile-sidebar__card-content">
        <p class="text">{{ locale.profile.welcome }}</p>
        <p class="username">{{ user.name }}</p>
      </div>
      <div @click="logout" class="page-profile-sidebar__card-logout">
        <IconLogout />
      </div>
    </div>

    <PageProfileSidebarAvatars v-if="$route.name == 'profile-settings'" />
    <PageProfileSidebarTicket v-else-if="$route.name == 'profile-ticket-id'" />
    <PageProfileSidebarSupport v-else />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const user = computed(() => store.getters['auth/user'])
    const locale = computed(() => store.getters['locale/locale'])

    const logout = async () => {
      store.commit('modal/OPEN', {
        name: 'logout',
        data: {}
      })
      // await store.dispatch('auth/logout')
      // window.location.replace('/')
    }

    return { user, locale, logout }
  },
})
</script>
