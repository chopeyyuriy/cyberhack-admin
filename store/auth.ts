import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  token: null,
  user: null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  token: (state) => {
    return state.token
  },
  isAuth: (state) => {
    return !!state.token
  },
  user: (state) => {
    return state.user!
  }
}

export const mutations: MutationTree<RootState> = {
  SET_TOKEN(state, payload) {
    state.token = payload
  },

  SET_USER(state, payload) {
    state.user = payload
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async update({ commit, dispatch, getters }) {
    const response = await this.$axios.get('/api/user')
    if (response.status == 200) {
      commit('SET_USER', response.data)
    } else {
      await dispatch('logout')
    }
    return response
  },

  async register(_, payload) {
    const response = await this.$axios.post('/api/register', payload)
    return response
  },

  async auth({ commit, dispatch }, payload) {
    const response = await this.$axios.post('/api/auth', payload)
    if (response.status == 200) {
      commit('SET_TOKEN', response.data.token)
      await dispatch('update')
    }
    return response
  },

  async checkBanStatus({ getters }) {
    const banIpCheck = await this.$axios.post('/api/ban/check');

    let isBanendByIp = !!banIpCheck.data.status;
    let isBannedByEmail = false;

    if (getters['isAuth']) {
      const banEmailCheck = await this.$axios.post('/api/user/check');
      // @ts-ignore
      isBannedByEmail = banEmailCheck?.response?.data?.error === '#BAN'
    }

    return isBanendByIp || isBannedByEmail;
  },

  logout({ commit }) {
    commit('SET_TOKEN', null)
  }
}
