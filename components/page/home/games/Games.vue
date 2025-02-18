<template>
  <div class="page-home-games">
    <div class="container">
      <div class="page-home-games__title">
        <PageTitle class="fadeInLeft500ms" style="animation-delay: 150ms">
          <div v-html="locale.home.games.title" />
        </PageTitle>
        <div class="page-home-games__stats fadeInRight500ms" style="animation-delay: 150ms">
          <PageHomeGamesStatsItem>
            <div v-html="locale.home.games.stats.years" />
          </PageHomeGamesStatsItem>
          <PageHomeGamesStatsItem>
            <div v-html="locale.home.games.stats.catalog.replace('{count}', stats.games_count)" />
          </PageHomeGamesStatsItem>
          <PageHomeGamesStatsItem>
            <div v-html="locale.home.games.stats.categories.replace('{count}', stats.products_count)" />
          </PageHomeGamesStatsItem>
        </div>
      </div>

      <CatalogCards>
        <GameCard
          v-for="(game, index) in games"
          :key="index"
          :data="game"
        />
      </CatalogCards>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const games = computed(() => store.getters['game/list'])
    const locale = computed(() => store.getters['locale/locale'])
    const stats = computed(() => store.getters['meta/stats'])

    return { games, locale, stats }
  },
})
</script>
