<template>
  <div
    class="main_container"
    :class="{
      flex_support: flexSupport,
      no_flex_support: !flexSupport,
      bg: true,
    }"
  >
    <div class="page-container">
      <div class="container">
        <Crumbs />
        <div class="admin-container">
          <TabContainer :arrows="true">
            <Tab
              @click="$router.push({ name: 'admin-games' })"
              :active="$route.name == 'admin-games'"
            >
              Игры
            </Tab>
            <Tab
              @click="$router.push({ name: 'admin-products' })"
              :active="$route.name == 'admin-products'"
            >
              Товары
            </Tab>
            <Tab
              @click="$router.push({ name: 'admin-accounts' })"
              :active="$route.name == 'admin-accounts'"
            >
              Аккаунты
            </Tab>
            <Tab
              @click="$router.push({ name: 'admin-selections' })"
              :active="$route.name == 'admin-selections'"
            >
              Подборки
            </Tab>
            <!-- <Tab 
              @click="$router.push({ name: 'admin-keys' })"
              :active="$route.name == 'admin-keys'"
            >
              Ключи
            </Tab> -->
            <Tab
              @click="$router.push({ name: 'admin-statuses' })"
              :active="$route.name == 'admin-statuses'"
            >
              Статусы
            </Tab>
            <Tab
              @click="$router.push({ name: 'admin-tags' })"
              :active="$route.name == 'admin-tags'"
            >
              Теги
            </Tab>
            <!-- <Tab 
              @click="$router.push({ name: 'admin-functionicons' })"
              :active="$route.name == 'admin-functionicons'"
            >
              Иконки для функционала
            </Tab> -->
            <Tab
              @click="$router.push({ name: 'admin-requirements' })"
              :active="$route.name == 'admin-requirements'"
            >
              Системные требования
            </Tab>
            <Tab
              @click="$router.push({ name: 'admin-requirements-types' })"
              :active="$route.name == 'admin-requirements-types'"
            >
              Типы системных требований
            </Tab>
            <Tab
              @click="$router.push({ name: 'admin-news' })"
              :active="$route.name == 'admin-news'"
            >
              Новости
            </Tab>
            <!-- <Tab 
              @click="$router.push({ name: 'admin-socials' })"
              :active="$route.name == 'admin-socials'"
            >
              Социальные сети
            </Tab> -->
            <!-- <Tab 
              @click="$router.push({ name: 'admin-contacts' })"
              :active="$route.name == 'admin-contacts'"
            >
              Контакты
            </Tab> -->
            <Tab
              @click="$router.push({ name: 'admin-problems' })"
              :active="$route.name == 'admin-problems'"
            >
              Популярные проблемы
            </Tab>
            <!-- <Tab 
              @click="$router.push({ name: 'admin-bot-problems' })"
              :active="$route.name == 'admin-bot-problems'"
            >
              Бот: Проблемы
            </Tab>
            <Tab 
              @click="$router.push({ name: 'admin-bot-solutions' })"
              :active="$route.name == 'admin-bot-solutions'"
            >
              Бот: Решения
            </Tab> -->
            <!-- <Tab 
              @click="$router.push({ name: 'admin-promos' })"
              :active="$route.name == 'admin-promos'"
            >
              Промокоды
            </Tab>
            <Tab 
              @click="$router.push({ name: 'admin-promos-history' })"
              :active="$route.name == 'admin-promos-history'"
            >
              Промокоды: История
            </Tab> -->
            <Tab
              @click="$router.push({ name: 'admin-users' })"
              :active="$route.name == 'admin-users'"
            >
              Пользователи
            </Tab>
            <!-- <Tab 
              @click="$router.push({ name: 'admin-payments' })"
              :active="$route.name == 'admin-payments'"
            >
              Платежи
            </Tab> -->
            <!-- <Tab 
              @click="$router.push({ name: 'admin-exchange-rate' })"
              :active="$route.name == 'admin-exchange-rate'"
            >
              Курс обмена
            </Tab> -->
            <Tab
              @click="$router.push({ name: 'admin-tickets' })"
              :active="$route.name == 'admin-tickets'"
            >
              Тикеты
            </Tab>
            <Tab
              @click="$router.push({ name: 'admin-theme' })"
              :active="$route.name == 'admin-theme'"
            >
              Тикеты: Темы
            </Tab>
            <Tab
              @click="$router.push({ name: 'admin-bans' })"
              :active="$route.name == 'admin-bans'"
            >
              Список банов
            </Tab>
            <Tab
              @click="$router.push({ name: 'admin-reviews' })"
              :active="$route.name == 'admin-reviews'"
            >
              Отзывы
            </Tab>
            <Tab
              @click="$router.push({ name: 'admin-notifications' })"
              :active="$route.name == 'admin-notifications'"
            >
              Уведомления
            </Tab>

            <!-- <Tab 
              @click="$router.push({ name: 'admin-payments-stats' })"
              :active="$route.name == 'admin-payments-stats'"
            >
              Статистика
            </Tab> -->
          </TabContainer>

          <div class="admin-content">
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  head() {
    const lang = this.$store.getters['locale/itemLang']
    return {
      htmlAttrs: {
        lang,
      },
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
