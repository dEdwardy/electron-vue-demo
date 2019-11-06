import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    common:{
      userinfo:{}
    }
  },
  getters:{
    userinfo:(state) => state.common.userinfo
  },
  mutations: {
    SET_USER_INFO(state, info){
      state.common.userinfo = info;
    }
  },
  actions: {
  },
  modules: {
  }
})
