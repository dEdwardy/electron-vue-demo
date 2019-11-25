<template>
  <div id="app">
    <m-layout></m-layout>
  </div>
</template>
<script>
  import MLayout from "./views/layout/index";
  export default {
    components: { MLayout }
  
  }
</script>
<style lang="scss">
//Tim: width 828px height 667px
 html,body, #app{
    width: 100%;
    height: 100%;
    line-height: 1;
  }
</style>
