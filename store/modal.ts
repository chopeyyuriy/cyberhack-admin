import { GetterTree, ActionTree, MutationTree } from 'vuex'

type ModalName = 'payment' | 'slider' | 'logout';

export const state = () => ({
  payment: {
    show: false,
    data: {
      product: null,
      rate: null
    },
    initialData: {
      product: null,
      rate: null
    }
  },
  slider: {
    show: false,
    data: {
      image: null,
    },
    initialData: {
      image: null
    }
  },
  video: {
    show: false,
    data: {
      url: null,
    },
    initialData: {
      url: null
    }
  },
  logout: {
    show: false,
    data: {
    },
    initialData: {
    }
  },
  ticketCreate: {
    show: false,
    data: {
    },
    initialData: {
    }
  }
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  payment(state) {
    return state.payment
  },
  slider(state) {
    return state.slider
  },
  video(state) {
    return state.video
  },
  logout(state) {
    return state.logout
  },
  ticketCreate(state) {
    return state.ticketCreate
  }
}

export const mutations: MutationTree<RootState> = {
  OPEN(state, { name, data }: { name: ModalName, data: any }) {
    state[name].show = true
    state[name].data = data
  },

  CLOSE(state, modal: ModalName) {
    state[modal].show = false
    state[modal].data = state[modal].initialData
  },

  SET_MODAL_DATA(state, { modal, data }: { modal: ModalName, data: any }) {
    state[modal].data = data
  }
}

export const actions: ActionTree<RootState, RootState> = {
}
