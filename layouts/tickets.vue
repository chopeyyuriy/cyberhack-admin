<template>
  <div
    class="main_container"
    :class="{ flex_support: flexSupport, no_flex_support: !flexSupport, bg: true }"
  >
    <Header />
    
    <div class="page-container">
      <div class="container">
        <Crumbs />
        <div class="admin-container">
          <TabContainer>
            <Tab 
              @click="$router.push({ name: 'tickets' })"
              :active="$route.name == 'tickets'"
            >
              Обращения
            </Tab>
          </TabContainer>

          <div class="admin-content">
            <Nuxt />
          </div>

        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  head() {
    const lang = this.$store.getters['locale/itemLang']
    return {
      htmlAttrs: {
        lang
      }
    }
  },

  setup() {
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
    return { flexSupport }
  },
})
</script>
