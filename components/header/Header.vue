<template>
  <div class="header">
    <transition name="fade">
      <HeaderSearch 
        v-if="isOpenSearch" 
        @close="isOpenSearch = false"
      />
    </transition>

    <transition name="fade">
      <PageProfileLogout v-if="logoutModal.show" />
    </transition>

    <div class="container">
      <div class="header-left">
        <a href="/" class="header-logo">
          <IconLogo />
        </a>
        <div class="header-nav">
          <HeaderNavLink href="/" goto="index">{{ locale.header.nav.home }}</HeaderNavLink>
          <HeaderNavLink href="/catalog" goto="catalog">{{ locale.header.nav.catalog }}</HeaderNavLink>
          <HeaderNavLink href="/faq" goto="faq">{{ locale.header.nav.faq }}</HeaderNavLink>
          <HeaderNavLink href="/contacts" goto="contacts">{{ locale.header.nav.contacts }}</HeaderNavLink>
          <!-- <HeaderNavLink href="/contacts" :external="true">{{ locale.header.nav.forum }}</HeaderNavLink> -->
        </div>
      </div>
      <div class="header-right">
        <div @click="isOpenSearch = true" class="header-search__btn">
          <IconSearch />
        </div>
        <div class="header-lang__btn">
          <div class="header-lang__btn-content" @click="isShowLang = true">
            <IconLang />
            {{ lang.toUpperCase() }}
          </div>
          <transition name="fade">
            <div v-if="isShowLang" class="header-dropdown">
              <div class="header-dropdown__overlay" @click="isShowLang = false"></div>
              <div class="header-dropdown__content">
                <div 
                  class="header-dropdown__item" 
                  :class="{ 'header-dropdown__item_active': lang === 'rus' }"
                  @click="setLang('rus')"
                >
                  Русский
                </div>
                <div 
                  class="header-dropdown__item" 
                  :class="{ 'header-dropdown__item_active': lang === 'eng' }"
                  @click="setLang('eng')"
                >
                  English
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div v-if="isAuth" class="header-profile">
          <UserAvatar :src="user.avatar" @click.native="isShowMenu = true" :class="{ 'user-avatar_active': isShowMenu }" />
          <transition name="fade">
            <div v-if="isShowMenu" class="header-dropdown">
              <div class="header-dropdown__overlay" @click="isShowMenu = false"></div>
              <div class="header-dropdown__content">
                <a 
                  class="header-dropdown__item" 
                  :class="{ 'header-dropdown__item_active': $route.name === 'profile-purchases' }"
                  href="/profile/purchases"
                >
                  <IconReceipt />
                  {{ locale.profile.tabs.purchases }}
                  <!-- <New /> -->
                </a>
                <a 
                  class="header-dropdown__item" 
                  :class="{ 'header-dropdown__item_active': $route.name === 'profile-tickets' || $route.name === 'profile-ticket-id' }"
                  href="/profile/tickets"
                >
                  <IconMessages />
                  {{ locale.profile.tabs.support }}
                  <!-- <New /> -->
                </a>
                <a 
                  class="header-dropdown__item" 
                  :class="{ 'header-dropdown__item_active': $route.name === 'profile-settings' }"
                  href="/profile/settings"
                >
                  <IconSettings />
                  {{ locale.profile.tabs.settings }}
                </a>
                <div 
                  class="header-dropdown__item" 
                  @click="logout"
                >
                  <IconLogout />
                  {{ locale.profile.tabs.logout }}
              </div>
              </div>
            </div>
          </transition>
        </div>
        <Button v-else href="/signin" class="header__signin-btn" theme="dark">
          <IconProfile />
          {{ locale.header.signin }}
        </Button>
        <div class="header-burger">
          <div v-if="isActiveMenu" class="header-burger__overlay" @click="isActiveMenu = false"></div>
          <div class="header-burger__btn" @click="isActiveMenu = !isActiveMenu">
            <IconBurger />
          </div>
          <transition name="fade">
            <div v-if="isActiveMenu" class="header-burger__nav">
              <HeaderNavLink href="/" goto="index">{{ locale.header.nav.home }}</HeaderNavLink>
              <HeaderNavLink href="/catalog" goto="catalog">{{ locale.header.nav.catalog }}</HeaderNavLink>
              <HeaderNavLink href="/faq" goto="faq">{{ locale.header.nav.faq }}</HeaderNavLink>
              <HeaderNavLink href="/contacts" goto="contacts">{{ locale.header.nav.contacts }}</HeaderNavLink>
              <HeaderNavLink href="/contacts" :external="true">{{ locale.header.nav.forum }}</HeaderNavLink>
              <Button class="header_mobile-signin" v-if="!isAuth" href="/signin" theme="dark">
                <IconProfile />
                {{ locale.header.signin }}
              </Button>
              <div class="header-support">
                <Button href="/profile/tickets">
                  <IconChat />
                  {{ locale.header.support }}
                </Button>
              </div>
            </div>
          </transition>
        </div>
        <div class="header-support">
          <Button href="/profile/tickets">
            <IconChat />
            {{ locale.header.support }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const isOpenSearch = ref(false)
    const isActiveMenu = ref(false)

    const store = useStore()

    const isAuth = computed(() => store.getters['auth/isAuth'])
    const user = computed(() => store.getters['auth/user'])
    const lang = computed(() => store.getters['locale/lang'])
    const locale = computed(() => store.getters['locale/locale'])

    const isShowLang = ref(false)
    const isShowMenu = ref(false)

    const logoutModal = computed(() => store.getters['modal/logout'])

    const setLang = (value: string) => {
      isShowLang.value = false;
      store.commit('locale/SET_LANG', value);
    }

    const logout = async () => {
      isShowMenu.value = false;
      store.commit('modal/OPEN', {
        name: 'logout',
        data: {}
      })
    }

    return { isOpenSearch, isAuth, user, lang, locale, isActiveMenu, isShowLang, setLang, isShowMenu, logoutModal, logout }
  },
})
</script>
