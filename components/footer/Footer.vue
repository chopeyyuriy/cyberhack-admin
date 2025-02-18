<template>
  <div class="footer">
    <div class="container">
      <div class="footer-container">
        <div class="footer-content">
          <IconLogo class="footer-content__logo" />
          <p>{{ locale.footer.description }}</p>
          <div class="footer-payments">
            <component 
              v-for="(payment, index) in payments"
              :is="`IconPayment${payment}`"
              :key="index"
            />
          </div>
        </div>
        <div class="footer-links">
          <div 
            v-for="(column, columnIndex) in Object.keys(links)"
            :key="columnIndex"
            class="footer-links__column"
          >
            <p class="footer-links__column-label">{{ column }}</p>
            <a 
              v-for="(link, linkIndex) in links[column]"
              :key="linkIndex"
              :href="link.href"
            >
              {{ link.label }}
            </a>
          </div>
          <div class="footer-links__column footer-links__column_socials">
            <p class="footer-links__column-label">{{ locale.footer.social }}</p>
            <a 
              v-for="(social, index) in socials"
              :key="index"
              :href="social.href"
            >
              <component :is="`IconSocial${social.icon}`" />
            </a>
          </div>
        </div>
      </div>

      <div class="footer-footer">
        <p class="footer-copy">Crooked Arm`s @ 2021 All rights reserved</p>
        <div class="footer-development">
          <p>
            Development: <a href="https://vk.com/webitp" target="_blank">webitp</a>
          </p>
          <p>
            Design: <a href="https://vk.com/zubovui" target="_blank">UIxZubov</a>
          </p>
        </div>
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

    const payments = [
      'Freekassa',
      'Mir',
      'Webmoney',
      'Youmoney',
      'Digiseller',
      'Lava'
    ]

    const links = computed(() => locale.value.footer.links)

    let socials = [
      {
        icon: 'VK',
        name: 'vk',
        href: ''
      },
      {
        icon: 'Discord',
        name: 'discord',
        href: ''
      },
      {
        icon: 'Telegram',
        name: 'telegram',
        href: ''
      },
      {
        icon: 'YouTube',
        name: 'youtube',
        href: ''
      }
    ]

    socials = socials.map((social) => {
      social.href = store.getters['config/socials'].links[social.name]
      return social
    })

    return { payments, links, socials, locale }
  },
})
</script>
