<template>
  <div class="m-sider-wrapper">
    <div v-for="friend in friendsList" :key="friend.id">
      <div class="friends" @click="chatTo(friend)">
        <Row class="friend">
          <Col span="7">
            <img :src="friend.avatar" class="avatar" :class="friend.online ? 'online' : 'offline'" />
          </Col>
          <Col span="14">
            <div class="username">
              <span>{{ friend.username }}</span>
            </div>
            <div class="content">
              <span>
                <!-- {{friend.content}} -->
              </span>
            </div>
          </Col>
          <Col span="3">
            <Badge
              v-show="showBadge(friend).show"
              class="badge"
              :count="showBadge(friend).num"
              type="error"
            ></Badge>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Row, Col, Badge } from "iview";
export default {
  name: "m-sider",
  computed: {
    ...mapGetters(["onlineList", "friendsList", "messages"])
    //1.friend当前在线 2.有未读消息 3.没有和当前friend聊天
  },
  components: {
    Row,
    Col,
    Badge
  },
  mounted() {
    // this.getFriendsList();
  },
  methods: {
    showBadge(friend) {
      // console.log(this.onlineList)
      // console.log(this.messages)
      let num = 0;
      if (friend.online && this.messages.length > 0) {
        this.messages.map(i => {
          if (i.from === friend.id && i.unread) {
            num++;
          }
        });
        let localRoute = this.$route.name;
        if (num === 0) return { show: false, num };
        if (localRoute && localRoute == "chat" ) {
          let query = JSON.parse(this.$route.query.data)
          // if(query && query.id == friend.id){
          //   console.log("chat with"+ friend.id);
          //   return { show:false, num }
          // }
          return { show: true, num };
        }
      }
        return { show:true, num }
    },
    chatTo(friend) {
      console.log(friend);
      if(this.messages.length > 0){
        this.messages.forEach((item,idx) => {
          if(item.from == friend.id){
            item.unread = false;
          }
        })
        this.$store.commit('GET_MESSAGE',[...this.messages])
        this.$store.commit('READ_MESSAGE')
      }
      this.$router
        .push({
          name: "chat",
          query: {
            data: JSON.stringify(friend)
          }
        })
        .catch(e => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.m-sider-wrapper {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background: #fff;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  .friends {
    width: 100%;
    .friend {
      cursor: pointer;
      &:hover {
        background-color: rgb(235, 235, 236);
      }
      img.avatar {
        width: 40px;
        height: 40px;
        margin: 8px 12px;
        border-radius: 50%;
      }
      .username {
        font-size: 16px;
        margin-top: 14px;
      }
      .content {
        color: #545454;
        font-size: 14px;
        margin-bottom: 14px;
      }
      .badge {
        margin: 19px 0;
      }
    }
  }
}
.offline {
  // -webkit-filter: grayscale(100%);
  // filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(1);
}
.online {
  -webkit-filter: grayscale(0);
  -moz-filter: grayscale(0);
  -ms-filter: grayscale(0);
  -o-filter: grayscale(0);
  filter: url("about:blank");
  filter: grayscale(0);
  filter: rgb;
}
</style>
