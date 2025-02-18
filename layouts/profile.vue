<template>
  <div
    class="main_container"
    :class="{
      flex_support: flexSupport,
      no_flex_support: !flexSupport,
      bg: true,
    }"
  >
    <Header />
    <div class="page-container page-profile">
      <div class="container">
        <transition name="fade">
          <PageProfileLogout v-if="logoutModal.show" />
        </transition>

        <Crumbs />
        <div class="page-profile__container">
          <PageProfileSidebar />
          <div class="page-profile-content">
            <TabContainer v-if="$route.name !== 'profile-ticket-id'">
              <Tab
                @click="$router.push({ name: 'profile-purchases' })"
                :active="$route.name == 'profile-purchases'"
              >
                <IconReceipt />
                {{ locale.profile.tabs.purchases }}
                <!-- <New /> -->
              </Tab>
              <Tab
                @click="$router.push({ name: 'profile-tickets' })"
                :active="$route.name == 'profile-tickets'"
              >
                <IconMessages />
                {{ locale.profile.tabs.support }}
                <!-- <New /> -->
              </Tab>
              <Tab
                @click="$router.push({ name: 'profile-settings' })"
                :active="$route.name == 'profile-settings'"
              >
                <IconSettings />
                {{ locale.profile.tabs.settings }}
              </Tab>
            </TabContainer>
            <div class="page-profile__content">
              <Nuxt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script lang="ts">
import Echo from 'laravel-echo'
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  middleware(ctx) {
    return ctx.store.dispatch('beforeRoute', {
      ctx,
    })
  },

  head() {
    const lang = this.$store.getters['locale/itemLang']
    return {
      htmlAttrs: {
        lang,
      },
    }
  },

  setup() {
    const store = useStore()

    const locale = computed(() => store.getters['locale/locale'])
    const logoutModal = computed(() => store.getters['modal/logout'])

    const flexSupport = ref(false)
    const checkFlexGap = () => {
      const flex = document.createElement('div')
      flex.style.display = 'flex'
      flex.style.flexDirection = 'column'
      flex.style.rowGap = '1px'
      flex.appendChild(document.createElement('div'))
      flex.appendChild(document.createElement('div'))
      document.body.appendChild(flex)
      const isSupported = flex.scrollHeight === 1
      flex.parentNode!.removeChild(flex)
      return isSupported
    }
    onMounted(() => {
      flexSupport.value = checkFlexGap()
    })
    return { flexSupport, locale, logoutModal }
  },
})
</script>
