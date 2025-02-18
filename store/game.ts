import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  slides: [],

  list: [],

  game: null,

  products: [],

  product: {},

  search: null,

  similarProducts: []
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  slides: (state) => {
    return state.slides
  },

  list: (state) => {
    return state.list
  },

  search: (state) => {
    return state.search
  },

  game: (state) => {
    return state.game
  },

  products: (state) => {
    return state.products
  },

  product: (state) => {
    return state.product
  },

  similarProducts: (state) => {
    return state.similarProducts
  }
}

export const mutations: MutationTree<RootState> = {
  SET_SLIDES(state, payload) {
    state.slides = payload
  },

  SET_GAME_LIST(state, payload) {
    state.list = payload
  },

  SET_SEARCH(state, payload) {
    state.search = payload
  },

  SET_GAME(state, payload) {
    state.game = payload
  },

  SET_PRODUCTS(state, payload) {
    state.products = payload
  },

  SET_PRODUCT(state, payload) {
    state.product = payload
  },

  SET_SIMILAR_PRODUCTS(state, payload) {
    state.similarProducts = payload
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async search({ commit }, payload) {
    const response = await this.$axios.get(`/api/games/search?q=${payload}`)
    if (response.status == 200)
      commit('SET_SEARCH', response.data)
  },

  async loadSlides({ commit }) {
    const response = await this.$axios.get('/api/slides')
    if (response.status == 200)
      commit('SET_SLIDES', response.data)
  },

  async loadGames({ commit }) {
    const response = await this.$axios.get('/api/games')
    if (response.status == 200)
      commit('SET_GAME_LIST', response.data)
  },

  async loadGame({ commit }, payload) {
    const response = await this.$axios.get(`/api/games/${payload}`)
    if (response.status == 200)
      commit('SET_GAME', response.data)
    return response
  },

  async loadProduct({ commit }, { gamePath, productPath }) {
    const response = await this.$axios.get(`/api/product/${gamePath}/${productPath}`)
    if (response.status == 200)
      commit('SET_PRODUCT', response.data)
    return response
  },

  async loadProducts({ commit, getters }) {
    const gameId = getters['game'].id
    const response = await this.$axios.get(`/api/products/${gameId}`)
    if (response.status == 200)
      commit('SET_PRODUCTS', response.data)
  },

  async loadSimilarProducts({ commit, getters }) {
    const product = getters['product']
    const gameId = product?.game.id
    const response = await this.$axios.get(`/api/products/${gameId}`)
    if (response.status == 200)
      commit('SET_SIMILAR_PRODUCTS', response.data.slice(0, 5).filter((item: any) => item.id !== product?.id))
  }
}
