<template>
  <div id="app">
    <router-view v-if="handleCurRouter"></router-view>
    <m-layout v-else></m-layout>
  </div>
</template>

<script>
import MLayout from "./views/layout/index";
export default {
  components: { MLayout },
  computed: {
    handleCurRouter() {
      const name = ["login"];
      return name.includes(this.$route.name);
    }
  }
};
</script>

<style lang="scss">
//Tim: width 828px height 667px
html,
body,
#app {
  width: 100%;
  height: 100%;
  line-height: 1;
}
</style>
  