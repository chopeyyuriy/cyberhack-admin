import { ActionTree, GetterTree, MutationTree } from 'vuex'

export const state = () => ({
  clientInit: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  clientInit: (state) => state.clientInit,
}

export const mutations: MutationTree<RootState> = {
  CLIENT_INIT(state) {
    state.clientInit = true
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtClientInit({ dispatch }) {
  },
  async beforeRoute({ commit, getters }, { ctx, to }) {
  
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('auth/update')
    await dispatch('config/loadSocials')
    await dispatch('config/loadExchange')
  }
}
