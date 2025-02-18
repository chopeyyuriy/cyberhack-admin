import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  socials: {
    links: {
      vk: '',
      discord: '',
      telegram: '',
      youtube: ''
    }
  },
  exchange: {
    '$': 62
  }
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  socials(state) {
    return state.socials
  },

  exchange(state) {
    return state.exchange
  }
}

export const mutations: MutationTree<RootState> = {
  SET_SOCIALS(state, payload) {
    state.socials = payload
  },

  SET_EXCHANGE(state, payload) {
    state.exchange = payload
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async loadSocials({ commit, getters }) {
    const response = await this.$axios.get('/storage/config/socials/data.json')
    if (response.status == 200) {
      commit('SET_SOCIALS', response.data)
    }
    return getters['socials']
  },

  async loadExchange({ commit, getters }) {
    const response = await this.$axios.get('/storage/config/prices/exchange_rates.json')
    if (response.status == 200) {
      commit('SET_EXCHANGE', response.data)
    }
    return getters['exchange']
  },
}
