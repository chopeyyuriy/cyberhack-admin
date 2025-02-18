import { GetterTree, ActionTree, MutationTree } from 'vuex'

import rus from '../locale/rus'
import eng from '../locale/eng'

const locale = {
  rus,
  eng
} as any

const LANGS = [
  'rus',
  'eng'
]

export const state = () => ({
  lang: 'rus',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  lang: (state) => {
    return state.lang
  },

  itemLang: (state) => {
    return state.lang.slice(0, 2)
  },

  locale: (state) => {
    return locale[state.lang]
  }
}

export const mutations: MutationTree<RootState> = {
  TOGGLE_LANG(state) {
    const newLang = LANGS.find(lang => lang != state.lang)
    if (newLang)
      state.lang = newLang
  },

  SET_LANG(state, payload) {
    state.lang = payload;
  }
}

export const actions: ActionTree<RootState, RootState> = {
  
}
