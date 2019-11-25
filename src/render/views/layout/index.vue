<template>
    <div class="m-layout-wrapper">
        <m-header></m-header>
        <div class="m-body-wrapper">
            <Split v-model="split" :min="min" :max="max">
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
    data(){
        return {
            split:0.3,
            min:0.2,
            max:0.8,
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