import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    common: {
      userinfo: {},
      friendsList: [],
      onlineList: [],
      messages: [],
    }
  },
  getters: {
    messages: state => state.common.messages,
    userinfo: state => state.common.userinfo,
    onlineList: state => state.common.onlineList,
    friendsList: state => {
      let online = [];
      let offline = [];
      if(state.common.friendsList.length > 0){
        state.common.friendsList.map(item => {
          if(item.online){
            online.push(item)
          }else{
            offline.push(item)
          }
        })
      }
      return [...online,...offline];
    },
  },
  mutations: {
    SET_USER_INFO(state, info) {
      state.common.userinfo = info;
    },
    SET_FRIENDS_LIST(state, data) {
      state.common.friendsList = data;
    },
    SET_ONLINE_LIST(state, data) {
      state.common.onlineList = data;
    },
    GET_MESSAGE(state, data) {
      // console.log(state.common.messages)
      state.common.messages.push(data);
      // state.common.messages = [...data,...state.common.messages];
    },
    READ_MESSAGE(state) {
      let arr = [];
      if(state.common.messages.length > 0 ) {
        state.common.messages.forEach((item, idx) => {
          if(!item.unread){
            arr.push(idx)
          }
        })
        arr.forEach(i => state.common.messages.splice(i,1))
      }
    },
  },
  actions: {}
});
