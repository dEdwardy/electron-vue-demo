<template>
  <div class="m-layout-wrapper">
    <m-header></m-header>
    <div class="m-body-wrapper">
      <Split v-model="split">
        <div slot="left" class="left-content">
          <m-sider></m-sider>
        </div>
        <div slot="right" class="right-content">
          <m-container></m-container>
        </div>
      </Split>
    </div>
  </div>
</template>

<script>
import MHeader from "./MHeader/index";
import MSider from "./MSider/index";
import MContainer from "./MContainer/index";
import { Split } from "iview";
import { mapGetters } from "vuex";
import * as _ from "loadsh";
export default {
  components: {
    MHeader,
    MSider,
    MContainer,
    Split
  },
  computed: {
    ...mapGetters(["friendsList"])
  },
  sockets: {
    online({ online, messages}) {
      console.log({ online, messages})
      if(messages && messages.length > 0){
        let m = messages.map(i => JSON.parse(i))
        console.log(m)
        this.$store.commit('GET_MESSAGE',m);
      }
      let data = online;
      this.$store.commit("SET_ONLINE_LIST", data);
      let friendsList = _.cloneDeep(this.friendsList);
      if ( data && data.length > 0 && friendsList && friendsList.length > 0) {
        for (let online of data) {
          for (let item of friendsList) {
            if (item.id === online.id) {
              item.status = 'online';
              item.online = true;
              item.socketId = online.socketId;
            }else{
              item.status = 'offline'
              item.online = false;
              item.socketId = null;
            }
          }
        }
      }else{
        friendsList.map(i => {
          i.status = 'offline'
        })
      }
      // console.log(Object.assign([],friendsList))
      this.$store.commit("SET_FRIENDS_LIST", friendsList);
    },
    friends_fresh(data) {
      // this.$store.commit("SET_FRIENDS_LIST", data);
      this.$store.commit("SET_ONLINE_LIST", data);
      let friendsList = _.cloneDeep(this.friendsList);
      if ( data && data.length > 0 && friendsList && friendsList.length > 0) {
        for (let online of data) {
          for (let item of friendsList) {
            if (item.id === online.id) {
              item.status = 'online';
              item.online = true;
              item.socketId = online.socketId;
            }
          }
        }
      }
      if(data.length ===0 ){
        for(let item of friendsList) {
          item.status = 'offline';
          item.online = false;
          item.socketId = null;
        }
      }
      // console.log(friendsList)
      this.$store.commit("SET_FRIENDS_LIST", friendsList);
    },
    chat_to(data) {
      console.warn(data)
      this.$store.commit('GET_MESSAGE',data);
    },
    messages(data) {

    }
  },
  created() {
    let user = JSON.parse(localStorage.getItem("userinfo"));
    this.$socket.emit("login", { id: user.id });
  },
  data() {
    return {
      split: 0.3
    };
  }
};
</script>

<style lang="scss" scoped>
.m-layout-wrapper {
  overflow: hidden;
  .m-body-wrapper {
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
    .left-content {
      height: 100%;
    }
    .right-content {
      height: 100% !important;
    }
  }
}
</style>