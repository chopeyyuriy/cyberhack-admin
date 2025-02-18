import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  avatars: [
    '/images/avatars/1.png',
    '/images/avatars/2.png',
    '/images/avatars/3.png',
    '/images/avatars/4.png',
    '/images/avatars/5.png',
    '/images/avatars/6.png',
    '/images/avatars/7.png',
    '/images/avatars/8.png',
    '/images/avatars/1.png',
    '/images/avatars/2.png',
    '/images/avatars/3.png',
    '/images/avatars/4.png',
    '/images/avatars/5.png',
    '/images/avatars/6.png',
    '/images/avatars/7.png',
    '/images/avatars/8.png'
  ],

  requestData: {
    avatar: null,
    avatar_url: null,
    email: null,
    name: null,
    password: null,
    c_password: null
  } as any
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  avatars: (state) => {
    return state.avatars
  },

  requestData: (state) => {
    return state.requestData
  }
}

export const mutations: MutationTree<RootState> = {
  SET_AVATARS(state, payload) {
    state.avatars = payload
  },

  SET_REQUEST_DATA(state, payload) {
    state.requestData = payload
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async loadAvatars({ commit }) {
    const response = await this.$axios.get('/api/avatars')
    if (response.status == 200) {
      commit('SET_AVATARS', response.data)
    }
    return response
  },

  async save({ state }) {
    const formData = new FormData();

    for (const key of Object.keys(state.requestData)) {
      if (state.requestData[key])
        formData.append(key, state.requestData[key])
    }
    
    const response = await this.$axios.post('/api/profile/settings/save', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    return response
  }
}
