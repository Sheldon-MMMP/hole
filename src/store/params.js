const getDefaultState = () => ({})


const params = {
  state: getDefaultState(),
  mutations: {
    SET_PARAMS(state, data) {
      for(let item in state){
        delete state[item]
      }
      Object.assign(state,data)
    },
  },
  actions: {
    setParams(store, data) {
      store.commit('SET_PARAMS', data)
    }
  },
  getters: {},
  namespaced: true
}

export default params
