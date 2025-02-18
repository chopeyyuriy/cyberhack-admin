<template>
  <div class="admin-games">
    <a href="/admin/products/create" class="admin-action">Создать товар</a>

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

    <div
      class="admin-statuses__game"
      v-for="(game, index) in mapedGames"
      :key="index"
    >
      <div v-if="game.products.length > 0">
        <h2 style="text-align: center">{{ game.name_ru }}</h2>
        <CatalogCards style="margin-top: 32px">
          <ProductCard
            v-for="(product, index) in game.products"
            :key="index"
            :data="product"
            :href="`/admin/products/${product.id}`"
          />
        </CatalogCards>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useStore,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',

  middleware: ['admin'],

  async asyncData({ $axios }) {
    const products = (await $axios.get('/api/admin/products')).data
    const games = (await $axios.get('/api/admin/games')).data

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
      products,
      games,
      mapedGames,
      initialMapedGames: [...mapedGames],
    }
  },

  setup() {
    const store = useStore()

    const search = ref('')

    store.commit('crumbs/SET_PATH', [
      {
        label: 'Администрирование',
        link: '/admin',
      },
      {
        label: 'Товары',
        link: '/admin/products',
      },
    ])

    return { search }
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
