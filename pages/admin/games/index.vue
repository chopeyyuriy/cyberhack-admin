<template>
  <div class="admin-games">
    <a href="/admin/games/create" class="admin-action">Создать игру</a>
    
    <Input style="margin-bottom: 16px; width: 30%" placeholder="Поиск игры" v-model="search" @input="onSearch">
      <template #icon>
        <IconSearch />
      </template>
    </Input>

    <Draggable 
      v-model="games" 
      draggable=".game-card" 
      style="margin-top: 0" 
      class="catalog-cards"
      ghost-class="game-card__ghost"
      @change="onSort"
    >
      <GameCard
        v-for="(game, index) in games"
        :key="game.id"
        :data="game"
        :href="`/admin/games/${game.id}`"
      />
    </Draggable>
  </div>
</template>

<script lang="ts">
import Draggable from 'vuedraggable'

import {
  computed,
  defineComponent, useStore, ref
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  
  middleware: ['admin'],
  
  components: {
    Draggable
  },

  async asyncData({ $axios }) {
    console.dir((await $axios.get('/api/admin/games')))
    const games = (await $axios.get('/api/admin/games')).data
    
    return {
      games,
      initialGames: [...games]
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
        label: 'Игры',
        link: '/admin/games'
      }
    ])

    return { search }
  },

  methods: {
    async update() {
      await this.$axios.get('/api/admin/games');
    },

    async onSort() {
      const games = this.games as any

      let sortedGames = games.map((game: any, index: number) => {
        return {
          id: game.id,
          position: index
        }
      })

      await this.$axios.post('/api/admin/games/position', {
        games: sortedGames
      });
      await this.update();
    },

    onSearch(value: string) {
      this.games = this.initialGames.filter((item: any) => {
        return (
          item.name_ru.toLowerCase().includes(this.search.toLocaleLowerCase()) ||
          item.name_en.toLowerCase().includes(this.search.toLocaleLowerCase())
        )
      })
    }
  }
})
</script>