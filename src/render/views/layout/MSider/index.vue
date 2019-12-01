<template>
  <div class="m-sider-wrapper">
    <div v-for="friend in friendsList" :key="friend.id">
      <div class="friends" @click="chatTo(friend)">
        <Row class="friend">
          <Col span="7">
            <img
              :src="friend.avatar"
              class="avatar"
              :class="friend.online ? 'online' : 'offline'"
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
    <div v-for="message in addFriendsMessages" :key="message.date">
      <div class="message" @click="handleMessage(message)">
        <Row>
          <Col span="7">
            <img :src="message.avatar" class="avatar online" />
          </Col>
          <Col span="14">
            <div class="username">
              <span>{{ message.username || "未读消息" }}</span>
            </div>
            <div class="content">
              <span>
                {{ message.content }}
              </span>
            </div>
          </Col>
          <Col span="3">
            <Badge class="badge" :count="countNum" type="error"></Badge>
          </Col>
        </Row>
      </div>
    </div>
    <Icon type="ios-add-circle addFriends" @click.stop="openModal" size="40" />
    <Modal
      v-model="modal"
      width="600"
      class="searchModal"
      :mask="mask"
      :transfer="transfer"
      :footer-hide="footer"
    >
      <div class="addModal" slot="header" style="text-align:center">
        <span
          :style="{ color: showAddFriends ? 'rgb(1,136,251)' : '' }"
          @click.stop="searchFreind"
          >找好友</span
        >
        <Divider type="vertical" />
        <span
          :style="{ color: showAddFriends ? '' : 'rgb(1,136,251)' }"
          @click.stop="searchRoom"
          >找群</span
        >
      </div>
      <div>
        <div style="padding:10px 0 30px 0">
          <Input
            v-model.trim="id"
            v-if="showAddFriends"
            search
            @on-search="search"
            enter-button="Search"
            placeholder="请输入ID"
          />
          <Input
            v-model.trim="roomId"
            v-else
            search
            @on-search="search"
            enter-button="Search"
            placeholder="请输入群ID"
          />
        </div>
        <div v-if="searchResult" class="search-result">
          <div
            class="item"
            style="display:flex;flex-direction:row"
            v-if="searchResult.id"
          >
            <img
              :src="searchResult && searchResult.avatar"
              style="width:60px;height:60px"
              alt="头像"
            />
            <span style="display:flex;flex-direction:column">
              <span>{{ searchResult.username }}</span>
              <Button v-if="showAddFriends" @click="add(searchResult)"
                >加好友</Button
              >
              <Button v-else>加入群</Button>
            </span>
          </div>
          <div style="text-align:center" v-else>
            查询无果!
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Row, Col, Badge, Icon, Modal, Divider, Input, Button } from "iview";
export default {
  name: "m-sider",
  computed: {
    ...mapGetters(["onlineList", "friendsList", "messages"]),
    addFriendsMessages() {
      if (this.messages.length > 0) {
        let data = this.messages.map(i => {
          if (i.type == "add_friends") {
            return i;
          }
        });
        console.warn(data);
        data.forEach(i => {
          i.avatar =
            "http://pic4.zhimg.com/50/v2-0019ec92840b3cda9c12445d4452e4a5_hd.jpg";
          i.username = "新朋友";
          i.content = '**申请添加你为好友'
        });
        console.warn(data);
        return data;
      } else {
        return [];
      }
    }
  },
  components: {
    Row,
    Col,
    Badge,
    Icon,
    Modal,
    Divider,
    Input,
    Button
  },
  data() {
    return {
      mask: false,
      transfer: true,
      modal: false,
      draggable: true,
      showAddFriends: true,
      footer: true,
      id: "",
      roomId: "",
      searchResult: null,
      countNum: 1,
    };
  },
  mounted() {
    // this.getFriendsList();
  },
  methods: {
    async handleMessage(message){
     this.$Modal.confirm({
                    title: '好友申请',
                    content: message.content,
                    okText: '同意',
                    cancelText: '拒绝',
                    onOk: async() => {
                        await this.$socket.emit('handle_add_friend',{...message, accept:true })
                        this.$Message.info('Clicked ok');
                    },
                    onCancel: async() => {
                        await this.$socket.emit('handle_add_friend',{ ...message, accept:false})
                        this.$Message.info('Clicked cancel');
                    }
                });
      await this.$socket.emit('')

    },
    add(item) {
      let id = JSON.parse(localStorage.getItem("userinfo")).id;
      this.$socket.emit("message", {
        from: id,
        to: item.id,
        type: "add_friends"
      });
      this.$Message.success("您的好友添加请求已经成功发送，正在等待对方确认。");
    },
    async search() {
      if (this.showAddFriends) {
        //search friends
        if (this.id == "") return;
        let res = await this.$http.Common.getUserByName(this.id);
        if (res && res.data.status == 200 && res.data.data) {
          res.data.data.avatar =
            "http://img1.imgtn.bdimg.com/it/u=3824684417,1120865232&fm=26&gp=0.jpg";
          this.searchResult = res.data.data;
        } else {
          this.searchResult = { message: "查询无果" };
        }
        console.log(res.data.data);
      } else {
        //search rooms
      }
    },
    searchFreind() {
      this.showAddFriends = true;
    },
    searchRoom() {
      this.showAddFriends = false;
    },
    openModal() {
      this.id = "";
      this.roomId = "";
      this.searchResult = null;
      console.log("open");
      this.modal = true;
    },
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
        if (localRoute && localRoute == "chat") {
          let query = JSON.parse(this.$route.query.data);
          // if(query && query.id == friend.id){
          //   console.log("chat with"+ friend.id);
          //   return { show:false, num }
          // }
          return { show: true, num };
        }
      }
      return { show: true, num };
    },
    chatTo(friend) {
      console.log(friend);
      if (this.messages.length > 0) {
        this.messages.forEach((item, idx) => {
          if (item.from == friend.id) {
            item.unread = false;
          }
        });
        this.$store.commit("GET_MESSAGE", [...this.messages]);
        this.$store.commit("READ_MESSAGE");
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
  .addFriends {
    cursor: pointer;
    display: block;
    position: absolute;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
    color: rgb(1, 129, 239);
    &:hover {
      color: rgb(40, 156, 255);
    }
  }
  .addModal {
    text-align: center;
    .search-result {
      .item {
        text-align: left;
        display: flex;
        flex-direction: row;
      }
    }
  }
}
.searchModal /deep/ .ivu-input {
  height: 40px;
}
.searchModal /deep/ .ivu-input-group {
  width: 440px;
  margin: 0 auto;
}
.searchModal /deep/ .ivu-icon-ios-close {
  font-size: 22px;
  &:hover {
    background: red;
    color: #fff;
  }
}
// .ivu-modal-body /deep/ .modalBody {
//   padding: 10px 0 30px 0;
// }
.addModal /deep/ span {
  font-size: 16px;
  cursor: pointer;
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
.message {
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
</style>
