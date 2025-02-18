import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  list: [],

  ticket: null,

  socket: null,

  messages: []
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  ticket: (state) => {
    return state.ticket
  },

  list: (state) => {
    return state.list
  },

  socket: (state) => {
    return state.socket
  },

  messages: (state) => {
    return state.messages
  },
}

export const mutations: MutationTree<RootState> = {
  SET_TICKET(state, payload) {
    state.ticket = payload
  },

  SET_TICKETS(state, payload) {
    state.list = payload
  },

  SET_MESSAGES(state, payload) {
    state.messages = payload
  },

  SET_SOCKET(state, payload) {
    if (!state.socket) {
      state.socket = payload
    }
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async loadTickets({ commit }) {
    const response = await this.$axios.get(`/api/ticket/list`);
    if (response.status == 200)
      commit('SET_TICKETS', response.data)
    return response
  },

  async loadTicket({ commit }, id) {
    const response = await this.$axios.get(`/api/ticket/${id}`);
    if (response.status == 200)
      commit('SET_TICKET', response.data)
    return response
  },

  async loadMessages({ commit }, id) {
    const response = await this.$axios.get(`/api/ticket/messages/${id}`);
    if (response.status == 200)
      commit('SET_MESSAGES', response.data)
    return response
  },

  async sendMessage({ getters }, message) {
    let ticket = getters['ticket'];
    const response = await this.$axios.post(`/api/ticket/message/send/${ticket.id}`, {
      message
    });
    return response
  },

  async loadSocket({ commit, getters }) {
    if (!getters['socket']) {
      // @ts-ignore
      let socket = this.$nuxtSocket({
        channel: '/ticket'
      })
      commit('SET_SOCKET', socket);
    }
  },

  async closeTicket({ getters, commit }) {
    let ticket = getters.ticket
    let response = await this.$axios.put(`/api/ticket/${ticket.id}/close`)
    if (response.status === 200) {
      commit('SET_TICKET', response.data);
    }
  }
}
