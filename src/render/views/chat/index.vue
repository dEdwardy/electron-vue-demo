<template>
  <div class="chat" v-cloak>
    <div class="top">
      <div class="username">
        <span class="name">{{ friend.username }}</span>
      </div>
      <div class="content">
        <!-- //聊天内容 -->
      </div>
    </div>
    <div class="bottom">
      <div class="toolbar">ToolBar~</div>
      <div class="userInput">
        <textarea id="input" style="resize:none"></textarea>
      </div>
      <div class="btn">
        <Button type="primary" style="width:65px" @click="send">发送</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'iview'
export default {
  name: "chat",
  data() {
    return {
      friend: {
        username:''
      }
    };
  },
  components:{
    Button
  },
  mounted() {
    this.friend = JSON.parse(this.$route.query.data);
    console.log(this.friend);
  },
  methods:{
    send(){
      let userinfo = localStorage.getItem('userinfo')
      let input = document.getElementById('input');
      if(this.friend.id && input.value){
        //由于socketId 刷新时可能会改变 所以传id
        this.$socket.emit('chat',{ from:userinfo.id, to:this.friend.id,message: input.value})
        input.value = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chat {
  height: 100%;
  .top {
    padding: 15px 12px 0 12px;
    height: 74%;
    .username {
      height: 38px;
      .name {
        font-size: 20px;
        line-height: 38px;
      }
    }
  }
  .bottom {
    padding: 0 12px 15px 12px;
    border-top: 1px solid rgb(234, 234, 234);
    height: 26%;
    .toolbar {
      height: 20px;
      line-height: 20px;
    }
    .userInput {
      height: 70%;
      #input {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
      }
    }
    .btn{
        text-align: right;
      }
  }
}
#input::-webkit-scrollbar {
  display: none;
}
</style>