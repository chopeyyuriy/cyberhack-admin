<template>
  <div class="admin-promos">
    <a href="/admin/promos/create" class="admin-action">Создать промокод</a>
    
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Промокод</TableCol>
        <TableCol>Скидка</TableCol>
        <TableCol>Активно</TableCol>
      </template>
      <template #content>
        <TableRow
          v-for="(promo, index) in promos"
          :key="index"
          @click="$router.push({ name: 'admin-promos-promo', params: { promo: promo.id } })"
        >
          <TableCol>
            #{{ promo.id }}
          </TableCol>
          <TableCol>
            {{ promo.text }}
          </TableCol>
          <TableCol>
            {{ promo.sale }}%
          </TableCol>
          <TableCol>
            {{ promo.active ? 'Да' : 'Нет' }}
          </TableCol>
        </TableRow>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  async asyncData({ $axios }) {
    const promos = (await $axios.get('/api/admin/promos')).data
    
    return {
      promos
    }
  },

  setup() {
    const store = useStore()

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Промокоды',
        link: '/admin/promos'
      }
    ])

    return { }
  },
})
</script>
