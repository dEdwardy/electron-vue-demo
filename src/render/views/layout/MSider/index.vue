<template>
  <div class="m-sider-wrapper">
    <div v-for="friend in friendsList" :key="friend.id">
      <div class="friends" @dblclick="chatTo(friend)">
        <Row class="friend">
          <Col span="7">
            <img
              :src="friend.avatar"
              class="avatar"
              :class="friend.status=='online'? 'online':'offline'"
            />
          </Col>
          <Col span="17">
            <div class="username">
              <span>{{friend.username}}</span>
            </div>
            <div class="content">
              <span>
                <!-- {{friend.content}} -->
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Row, Col } from "iview";
export default {
  name: "m-sider",
  computed: {
    ...mapGetters(["onlineList", "friendsList"])
  },
  components: {
    Row,
    Col
  },
  mounted() {
    // this.getFriendsList();
  },
  methods: {
    // async getFriendsList() {
    //   const res = await this.$http.Common.friendsList();
    //   if (res && res.data.data.friends.length > 0) {
    //     res.data.data.friends.map(i => {
    //       i.content = "呵呵" + Math.random(1, 2).toFixed(2) + "嘿嘿";
    //       // i.status ="offline";
    //       i.avatar = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3031331030,3423517444&fm=26&gp=0.jpg";
    //     });
    //   }
    //   this.$store.commit("SET_FRIENDS_LIST", res.data.data.friends);
    // },
    chatTo(friend) {
      console.log(friend);
      this.$router.push({
        name: "chat",
        query: {
          data: JSON.stringify(friend)
        }
      }).catch((e) => { })
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
    }
  }
}
.offline {
  -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
  filter: grayscale(100%);
}
</style>