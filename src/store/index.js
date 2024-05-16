import Vue from 'vue'
import Vuex from 'vuex'
import params from './params';
import createPersistedState from 'vuex-persistedstate';
import clerkLevel from './clerkLevel';
import userInfo from './userInfo'
import clerkInfo from './clerkInfo'

Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    clerkLevel,
    params,
    userInfo,
    clerkInfo
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })] 
})


export default store
