<template>
  <div class="admin-statuses">
    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>Период</TableCol>
        <TableCol>Цена</TableCol>
        <TableCol>Количество ключей</TableCol>
        <!-- <TableCol>Статус</TableCol> -->
      </template>
      <template #content>
        <div 
          class="admin-statuses__game"
          v-for="(product, index) in products"
          :key="index"
        >
          <h2 style="text-align: center; margin: 16px 0;">{{ product.game.name_ru }}: {{ product.name_ru }}</h2>
          <TableRow
            v-for="(rate, index) in product.rates"
            :key="index"
          >
            <!-- <TableCol>
              #{{ product.id }}
            </TableCol> -->
            <TableCol>
              {{ rate.period }} дн.
            </TableCol>
            <TableCol>
              {{ rate.cost }} {{ rate.currency }}
            </TableCol>
            <TableCol>
              {{ getKeysCount(rate.keys) }} шт.
            </TableCol>
          </TableRow>
        </div>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, useContext, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  async asyncData({ $axios }) {
    const games = (await $axios.get('/api/admin/games')).data
    let products = (await $axios.get('/api/admin/products')).data
    const rates = (await $axios.get('/api/admin/product/rates')).data

    products = products.filter((product: any) => product.rates.length > 0)
    // let mapedGames = games.map((game: any) => {
    //   let filteredProducts = products.filter((product: any) => product.game.id === game.id)
    //   return {
    //     ...game,
    //     products: filteredProducts
    //   }
    // }).filter((game: any) => game.products.length > 0)
    
    return {
      games,
      products,
    }
  },

  setup() {
    const store = useStore()
    const { $axios } = useContext();

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin'
      },
      {
        label: 'Ключи',
        link: '/admin/keys'
      }
    ])

    return { }
  },

  methods: {
    getKeysCount(keys: string) {
      return keys?.split('\n').filter((key) => !!key).length || 0;
    }
  }
})
</script>
