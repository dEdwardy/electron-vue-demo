import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    common:{
      userinfo:{ },
      friendsList:[],
      onlineList: [],
    }
  },
  getters:{
    userinfo:(state) => state.common.userinfo,
    friendsList: (state) => state.common.friendsList,
    onlineList: (state) => state.common.onlineList,
  },
  mutations: {
    SET_USER_INFO(state, info){
      state.common.userinfo = info;
    },
    SET_FRIENDS_LIST(state, data){
      state.common.friendsList = data;
    },
    SET_ONLINE_LIST(state, data){
      state.common.onlineList = data;
    }
  },
  actions: {
    
  },
  modules: {
  }
})
