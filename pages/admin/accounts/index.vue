<template>
  <div class="admin-accounts">
    <a href="/admin/accounts/create" class="admin-action">Создать аккаунт</a>
    
    <Input style="margin-bottom: 16px; width: 30%" placeholder="Поиск игры" v-model="search" @input="onSearch">
      <template #icon>
        <IconSearch />
      </template>
    </Input>

    <div class="catalog-cards">
      <AccountCard
        v-for="(account, index) in accounts"
        :key="index"
        :data="account"
        :href="`/admin/accounts/${account.id}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, useStore, ref
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  async asyncData({ $axios }) {
    const accounts = (await $axios.get('/api/admin/accounts')).data

    return {
      accounts,
      initialAccounts: [...accounts]
    }
  },

  setup() {
    const store = useStore()

    const search = ref('');

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Аккаунты',
        link: '/admin/accounts'
      }
    ])

    return { search }
  },

  methods: {
    onSearch(value: string) {
      this.accounts = this.initialAccounts.filter((item: any) => {
        return (
          item.name_ru.toLowerCase().includes(this.search.toLocaleLowerCase()) ||
          item.name_en.toLowerCase().includes(this.search.toLocaleLowerCase())
        )
      })
    }
  }
})
</script>
