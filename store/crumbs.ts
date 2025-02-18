import { GetterTree, ActionTree, MutationTree } from 'vuex'

type Path = {
  label: string,
  link: string
}

export const state = () => ({
  path: [] as Array<Path>
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  path: (state) => {
    return state.path
  }
}

export const mutations: MutationTree<RootState> = {
  SET_PATH(state, payload: Array<Path>) {
    state.path = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  
}
