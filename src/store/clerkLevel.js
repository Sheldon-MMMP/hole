
const clerkLevel = {
  state: () => ({
    clerkLevelList:[]
  }),
  mutations: {
    setClerkLevel(state,data){
      state.clerkLevelList = data
    }
  },
  actions: {
    setClerkLevel(store,data){
      store.commit('setClerkLevel',data)
    }
  },
  getters: {},
  namespaced: true,
}

export default clerkLevel;
