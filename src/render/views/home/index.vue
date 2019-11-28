<template>
    <div class="home">
        <!-- <MInput :value="value" @input="handleInput" />
        <br> -->
        <MInput :value="value1"  />
        <br>
        <MInput :value="value2"  />
        <br>
        <MInput :value="value3"  />
        <br>
        <div style="width:220px;display:inline-block">
            <m-select v-model="selectOp" @on-select="handleSelect" placeholder="请选择地区" :selectOptions="selectOptions"/>
        </div>
        <div style="width:220px; display:inline-block" >
            <m-select v-model="selectOp2" @on-select="handleSelect2" placeholder="请选择地区" :selectOptions="selectOptions2"/>
        </div>
    </div>
</template>

<script>
// import { ipcRenderer } from 'electron'
import MInput from '../../components/MInput/index'
import MSelect from '../../components/MSelect/index'
export default {
    name:'home',
    components:{
        MInput,
        MSelect
    },
    data(){
        return {
            value:'123',
            value1:'1',
            value2:'2',
            value3:'3',
            value4:'4',
            selectOptions:[
                {label: '苏州',value:'suzhou'},
                {label: '重庆',value:'chongqing'},
                {label: '杭州',value:'hangzhou'}
            ],
            selectOp:null,
            selectOp2:null,
            selectOptions2:[
                {label: '周一不上班',value:'1'},
                {label: '周二不上班',value:'2'},
                {label: '周三不上班',value:'3'},
                {label: '周四不上班',value:'4'},
                {label: '周五不上班',value:'5'},
                {label: '周六不上班',value:'6'},
                {label: '周日不上班',value:'7'}
            ]
        }
    },
    methods:{
        handleInput(s){
            // console.log(s)
        },
        handleSelect(val){
            this.selectOp = val.value;
            // ipcRenderer.send('select',val.value)
        },
        handleSelect2(val){
            this.selectOp2 = val.value;
        }
    }
}
</script>

<style lang="scss" scoped>
.home{
    padding: 15px;
}
</style>