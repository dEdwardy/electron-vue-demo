<template>
    <div class="m-sider-wrapper">
        <div v-for="friend in list" :key="friend.id">
            <div class="friends" @click="chatTo(friend)">
                <Row class="friend">
                    <Col span="7"><img :src="friend.avatar" class="avatar"/></Col>
                    <Col span="17">
                        <div class="username">
                           <span>
                                {{friend.username}}
                           </span>
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
import { Row, Col } from 'iview'
export default {
    name: 'm-sider',
    data(){
        return {
            list:[
                {
                    id:Date.now()+''+Math.random(),

                }
            ]
        }
    },
    components:{
        Row,
        Col
    },
    created(){
        let arr = []
        for(let i=0; i<20; i++){
            arr.push({
                id:Date.now()+''+Math.random(),
                username:'哈哈'+i+1,
                content:'heh'+i,
                status:Math.random(0,1)>0.5? 'online':'offline',
                avatar:'http://pic4.zhimg.com/50/v2-0019ec92840b3cda9c12445d4452e4a5_hd.jpg'
            })
        }
        this.list =arr;
    },
    async mounted(){
         const res = await this.$http.Common.friendsList();
         res.data.data.friends.map(i =>{
             i.content = '呵呵'+Math.random(1,2).toFixed(2)+'嘿嘿',
             i.status = Math.random(0,1)>0.5? 'online':'offline',
             i.avatar = 'http://pic4.zhimg.com/50/v2-0019ec92840b3cda9c12445d4452e4a5_hd.jpg'
         }) 
        console.log(res.data.data.friends)
        this.list = res.data.data.friends
    },
    methods:{
        async chatTo(friend){
            console.log(friend)
        }
    }
}
</script>

<style lang="scss" scoped>
.m-sider-wrapper{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    background: #fff;
    -webkit-transition: all .3s;
    transition: all .3s;
    .friends{
        width: 100%;
        .friend{
            cursor: pointer;
            &:hover{
                background-color:rgb(235,235,236);
            }
            img.avatar{
                width: 40px;
                height: 40px;
                margin:8px 12px; 
                border-radius: 50%;
            }
            .username{
                font-size: 16px;
                margin-top:14px;
            }
            .content{
                color:#545454 ;
                font-size: 14px;
                margin-bottom: 14px;
            }
        }
    }
}
        
</style>