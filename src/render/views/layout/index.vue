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
import { Split} from 'iview'
export default {
    components:{
        MHeader,
        MSider,
        MContainer,
        Split
    },
    mounted(){
        console.log(this.$socket)
        this.$socket.on('online',(data) => {
            console.log(data)
        });
    },
    data(){
        return {
            split:0.3,
        }
    }
}
</script>

<style lang="scss" scoped>
.m-layout-wrapper {
    overflow: hidden;
    .m-body-wrapper {
        width: 100%;
        position: absolute;
        top: 60px;
        bottom: 0;
        .left-content{
            height: 100%;
        }
        .right-content{
            height: 100% !important;
        }
    }
}
</style>