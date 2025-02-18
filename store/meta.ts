import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  stats: {
    games_count: 0,
    products_count: 0
  },
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  stats: (state) => {
    return state.stats
  }
}

export const mutations: MutationTree<RootState> = {
  SET_STATS(state, payload) {
    state.stats = payload
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async loadStats({ commit }) {
    const response = await this.$axios.get('/api/games/statistic');
    if (response.status == 200)
      commit('SET_STATS', response.data)
  }
}
