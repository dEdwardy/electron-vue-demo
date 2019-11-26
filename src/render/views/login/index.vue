<template>
  <div class="login">
    <div class="loginForm">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" class="ivinput" v-model="formInline.user" placeholder="用户名">
            <Icon type="ios-person-outline" size="14" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password" style="height:36px">
          <Input type="password" class="ivinput" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-lock-outline" size="14" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem style="margin-bottom:10px;text-align:right">
          <Button type="primary" @click="handleSubmit('formInline')">登陆</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
// import { ipcRenderer } from 'electron'
import API from '@/api'
import { Icon, Button, Form, FormItem, Input, Radio } from "iview";
export default {
  name: "login",
  components: {
    Form,
    FormItem,
    Input,
    Radio,
    Icon,
    Button
  },
  data(){
      return{
           formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能低于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        sockets:{
          connect(){
            console.log('连接成功')
          },
          disconnect(){
            console.log('断开连接')
          }
        },
        methods:{
              handleSubmit(name) {
                this.$refs[name].validate(async(valid) => {
                    if (valid) {
                        let params = {
                            username:this.formInline.user,
                            password:this.formInline.password
                        }
                        let res = await this.$http.Common.login(params);
                        if(res && res.data && res.data.status ===200){
                            localStorage.setItem('Token',res.data.data.token)
                            // const friends = await this.$http.Common.friendsList();
                            // console.log(friends)
                            this.$socket.emit('login',{ id:res.data.data.id});
                            this.$Message.success('登录成功!');
                            // ipcRenderer.send('notify',{
                            //   notify:true,
                            //   detail:'登录成功'
                            // });
                            setTimeout(() => {
                                this.$router.push({
                                name:'home'
                            })}, 1000);
                            
                        }else{
                            this.$Message.warning('账号或密码错误!');
                        }
                    } 
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
.login >>> .ivinput{
    height: 36px;
}
.login {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 15px;
  background-image: url('~@/assets/imgs/1.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .loginForm{
      text-align: center;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      padding:40px 40px 6px 40px;
      border-radius: 6px;
      background-color: rgba(0,0,0,0.2);
      
  }
}
</style>