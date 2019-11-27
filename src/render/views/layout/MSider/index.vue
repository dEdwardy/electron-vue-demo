<template>
  <div class="m-sider-wrapper">
    <div v-for="friend in friendsList" :key="friend.id">
      <div class="friends" @dblclick="chatTo(friend)">
        <Row class="friend">
          <Col span="7">
            <img
              :src="friend.avatar"
              class="avatar"
              :class="friend.status == 'online' ? 'online' : 'offline'"
            />
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
      console.log(this.onlineList)
      console.log(this.messages)
      let num = 0;
      if (friend.status == "online") {
        if (this.messages && this.messages.length > 0) {
          this.messages.map(i => {
            if (i.from === friend) {
              num++;
            }
          });
        } else {
          return { show: false, num };
        }
        let data = this.$router.query.data
          ? JSON.parse(this.$router.query.data)
          : null;
        return num > 0 && (!data || data.id !== friend.id)
          ? { show: true, num }
          : { show: false, num };
      } else {
        return { show: false, num };
      }
    },
    async getFriendsList() {
      const res = await this.$http.Common.friendsList();
      if (res && res.data.data.friends.length > 0) {
        res.data.data.friends.map(i => {
          i.content = "呵呵" + Math.random(1, 2).toFixed(2) + "嘿嘿";
          // i.status ="offline";
          i.avatar =
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3031331030,3423517444&fm=26&gp=0.jpg";
        });
      }
      this.$store.commit("SET_FRIENDS_LIST", res.data.data.friends);
    },
    chatTo(friend) {
      console.log(friend);
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
  -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
  filter: grayscale(100%);
}
</style>
