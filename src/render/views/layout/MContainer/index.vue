<template>
    <div class="m-container-wrapper">
        <router-view/>
    </div>
</template>

<script>
export default {
    name:'m-contaienr'
}
</script>

<style lang="scss" scoped>
.m-container-wrapper{
    height: 100%;
    // padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    .m-main{
        height: 100%;
        box-sizing: border-box;
        position: relative;
    }
            

}
</style>