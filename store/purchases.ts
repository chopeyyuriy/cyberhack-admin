import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  purchases: [
  ]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  purchases: (state) => {
    return state.purchases
  },
}

export const mutations: MutationTree<RootState> = {
  SET_PURCHASES(state, payload) {
    state.purchases = payload
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async loadPurchases({ commit, getters }) {
    const response = await this.$axios.get(`/api/payment/list`)
    if (response.status == 200)
      commit('SET_PURCHASES', response.data)
  },
}
