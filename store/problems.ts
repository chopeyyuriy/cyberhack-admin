import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  problems: [],
  problem: [],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  problems: (state) => {
    return state.problems
  },

  problem: (state) => {
    return state.problem
  },
}

export const mutations: MutationTree<RootState> = {
  SET_PROBLEMS(state, payload) {
    state.problems = payload
  },

  SET_PROBLEM(state, payload) {
    state.problem = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async loadProblems({ commit }) {
    const response = await this.$axios.get('/api/problems')
    if (response.status == 200)
      commit('SET_PROBLEMS', response.data)
  },

  async loadProblem({ commit }, payload) {
    const response = await this.$axios.get(`/api/problems/${payload}`)
    if (response.status == 200)
      commit('SET_PROBLEM', response.data)
    return response
  },
}
