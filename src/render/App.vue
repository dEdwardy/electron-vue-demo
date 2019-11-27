<template>
  <div id="app" v-cloak>
    <router-view v-if="handleCurRouter"></router-view>
    <m-layout v-else></m-layout>
  </div>
</template>

<script>
import MLayout from "./views/layout/index";
export default {
  components: { MLayout },
  data() {
    return {
      // handleCurRouter:true
    };
  },
  computed: {
    handleCurRouter() {
      const name = ["login"];
      console.log(this.$route.name);
      if (!this.$route.name) {
        return true;
      }
      return name.includes(this.$route.name);
    }
  },
  // sockets: {
  //   online(data) {
  //     console.log(data);
  //   },
  //   friends_fresh(data) {
  //     console.log(data);
  //   }
  // },
  created() {
    //在页面加载时读取localStorage里的状态信息
    if (localStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("store", JSON.stringify(this.$store.state));
    });
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
[v-cloak] {
  display: none;
}
</style>
