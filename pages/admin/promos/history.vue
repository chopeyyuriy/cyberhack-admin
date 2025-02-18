<template>
  <div class="admin-promos">
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>E-mail</TableCol>
        <TableCol>Промокод</TableCol>
        <TableCol>Дата</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(promo, index) in allPromos"
          :key="index"
        >
          <TableCol>
            #{{ promo.id }}
          </TableCol>
          <TableCol>
            {{ promo.email }}
          </TableCol>
          <TableCol>
            {{ getPromo(promo.promo_code_id).text }}
          </TableCol>
          <TableCol>
            {{ (new Date(promo.created_at)).toLocaleString() }}
          </TableCol>
        </TableRow>
      </template>
    </Table>
    <div class="admin-users__pagination">
      <Button v-if="promos.next_page_url" tag="button" @click="loadPromos" theme="dark">Загрузить еще</Button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, ref, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  async asyncData({ $axios }) {
    const promos = (await $axios.get('/api/admin/promos-history')).data
    const promosList = (await $axios.get('/api/admin/promos')).data
    
    return {
      promos,
      promosList
    }
  },

  setup() {
    const store = useStore()

    const permissions = ['Пользователь', 'Модератор', 'Администратор']

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Промокоды: История',
        link: '/admin/promos/history'
      }
    ])

    const allPromos = ref([] as any)

    return { permissions, allPromos }
  },

  created() {
    // @ts-ignore
    this.allPromos = this.promos.data;
  },

  methods: {
    async loadPromos() {
      // @ts-ignore
      let promos = await this.$axios.get(this.promos.next_page_url);
      this.allPromos = [
        // @ts-ignore
        ...this.allPromos,
        ...promos.data.data
      ]
      this.promos = promos.data;
    },

    getPromo(id: number) {
      // @ts-ignore
      return this.promosList.find((product: any) => product.id === id) || {};
    }
  }
})
</script>
