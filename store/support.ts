import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  tickets: [
    // {
    //   id: 1,
    //   theme: 'Проблема с оплатой',
    //   is_closed: false,
    //   created_at: '19.04.2022'
    // },
    // {
    //   id: 1,
    //   theme: 'Проблема с оплатой',
    //   is_closed: true,
    //   created_at: '19.04.2022'
    // },
    // {
    //   id: 1,
    //   theme: 'Проблема с оплатой',
    //   is_closed: true,
    //   created_at: '19.04.2022'
    // },
    // {
    //   id: 1,
    //   theme: 'Проблема с оплатой',
    //   is_closed: true,
    //   created_at: '19.04.2022'
    // },
    // {
    //   id: 1,
    //   theme: 'Проблема с оплатой',
    //   is_closed: true,
    //   created_at: '19.04.2022'
    // }
  ]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  tickets: (state) => {
    return state.tickets
  }
}

export const mutations: MutationTree<RootState> = {
  SET_TICKETS(state, payload) {
    state.tickets = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  
}
