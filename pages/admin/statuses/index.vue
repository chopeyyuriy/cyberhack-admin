<template>
  <div class="admin-statuses">
    <Input
      style="margin-bottom: 16px; width: 30%"
      placeholder="Поиск игры"
      v-model="search"
      @input="onSearch"
    >
      <template #icon>
        <IconSearch />
      </template>
    </Input>

    <Table style="box-sizing: border-box">
      <template #head>
        <TableCol>ID</TableCol>
        <TableCol>Название</TableCol>
        <TableCol>Статус</TableCol>
      </template>
      <template #content>
        <div
          class="admin-statuses__game"
          v-for="(game, index) in mapedGames"
          :key="index"
        >
          <div v-if="game.products.length > 0">
            <h2 style="text-align: center">{{ game.name_ru }}</h2>
            <TableRow v-for="(product, index) in game.products" :key="index">
              <TableCol> #{{ product.id }} </TableCol>
              <TableCol>
                {{ product.name_ru }}
              </TableCol>
              <TableCol>
                <InputSelect
                  :data="statusOptions"
                  v-model="product.status"
                  @input="onChangeStatus(product.id, $event)"
                />
              </TableCol>
            </TableRow>
          </div>
        </div>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  useStore,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',

  middleware: ['admin'],

  async asyncData({ $axios }) {
    const games = (await $axios.get('/api/admin/games')).data
    const products = (await $axios.get('/api/admin/products')).data

    let mapedGames = games
      .map((game: any) => {
        let filteredProducts = products.filter(
          (product: any) => product.game.id === game.id
        )
        return {
          ...game,
          products: filteredProducts,
        }
      })
      .filter((game: any) => game.products.length > 0)

    return {
      games,
      products,
      mapedGames,
      initialMapedGames: [...mapedGames],
    }
  },

  setup() {
    const store = useStore()
    const { $axios } = useContext()

    const search = ref('')

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin',
      },
      {
        label: 'Статусы',
        link: '/admin/statuses',
      },
    ])

    const statusOptions = [
      {
        label: 'Updating',
        value: 0,
      },
      {
        label: 'Detected',
        value: 1,
      },
      {
        label: 'Undetected',
        value: 2,
      },
      {
        label: 'Testing',
        value: 3,
      },
      {
        label: 'At own risk',
        value: 4,
      },
    ]

    const onChangeStatus = async (
      productID: number,
      status: string | number
    ) => {
      await $axios.post(`/api/admin/products/${productID}/status`, {
        status: typeof status == 'string' ? Number.parseInt(status) : status,
      })
    }

    return { statusOptions, onChangeStatus, search }
  },

  methods: {
    onSearch(value: string) {
      this.mapedGames = this.initialMapedGames.map((item: any) => {
        return {
          ...item,
          products: item.products.filter((item: any) => {
            return (
              item.name_ru
                .toLowerCase()
                .includes(this.search.toLocaleLowerCase()) ||
              item.name_en
                .toLowerCase()
                .includes(this.search.toLocaleLowerCase())
            )
          }),
        }
      })
    },
  },
})
</script>
