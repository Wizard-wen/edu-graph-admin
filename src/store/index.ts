import { createStore } from 'vuex'

export default createStore<{
  user?: {
    name: string
  }
}>({
  state: {
    user: undefined
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
