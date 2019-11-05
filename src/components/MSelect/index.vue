<template>
  <div class="e-select-wrapper" ref="select" v-out="clickOut">
    <div class="input">
      <input type="text" ref="input" :placeholder="placeholder" readonly @click.stop="toggle" />
      <Icon v-show="!isShow" size="30" class="down" @click.stop="toggle" type="md-arrow-dropdown" />
      <Icon v-show="isShow" size="30" class="up" @click.stop="toggle" type="md-arrow-dropup" />
      <ul v-show="isShow">
        <li
          v-for="(item,index) in selectOptions"
          :key="item.value"
          @click.stop="handleClickItem(item)"
        >{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Icon } from "iview";
export default {
  name: "m-select",
  components: {
    Icon
  },
  props: {
    placeholder: {
      type: String,
      default: "Please select"
    },
    selectOptions: {
      type: Array,
      default: () => {
        [
          { label: "哈哈", value: "哈哈" },
          { label: "哈哈1", value: "哈哈1" },
          { label: "哈哈2", value: "哈哈2" }
        ];
      }
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    this.toggle = this.toggle.bind(this);
    // this.handleClickOut = this.handleClickOut.bind(this);
    // document.addEventListener("click", this.handleClickOut, false);
  },
  destroyed() {
    // document.removeEventListener("click", this.handleClickOut, false);
  },
  methods: {
      clickOut(){
          console.log('ooooo')
          console.log(this)
          if(!this.isShow)return;
          this.isShow = false;
      },
    // handleClickOut(e) {
    //     console.log('out',this.isShow)
    //   if (!this.isShow) return;
    //   let arr = _.without(this.$parent.$children,this);
    //   arr.map((i) => {
    //       if(i.$options._componentTag=='m-select'){
    //           console.log(i)
    //           i.isShow = false
    //       }
    //       return i
    //   } )
    //   if (e.target.contains(this.$refs.select)) {
    //     this.isShow = false;
    //   }
    // },
    toggle() {
        console.log('toggle')
      this.isShow = !this.isShow;
      this.$refs.input.focus();
    },
    handleClickItem(item) {
    let arr = _.without(this.$parent.$children,this);
      arr.map((i) => {
          if(i.$options._componentTag=='m-select'){
              console.log(i)
              i.isShow = false
          }
          return i
      } )
      this.$refs.input.value = item.label;
      this.isShow = false;
      this.$emit("on-select", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.e-select-wrapper {
  position: relative;
  margin: 10px 16px;
  .input {
    input {
      cursor: pointer;
      height: 30px;
      width: 100%;
      border-radius: 4px;
      padding:0 6px;
      border: 1px solid gray;
      &::-webkit-input-placeholder {
        margin-left: 6px;
}
      &:hover,
      &:visited,
      &:active,
      &:focus {
        border: 1px solid rgb(64, 158, 255);
      }
    }
    & .down,
    & .up {
      position: absolute;
      margin-left: -34px;
      cursor: pointer;
    }
    ul {
      position: absolute;
      overflow: hidden;
      margin-top: 2px;
      border: 1px solid rgb(64, 158, 255);
      border-radius: 4px;
      width: 100%;
      & li {
        height: 30px;
        margin: 1px 6px;
        width: 100%;
        padding: 2px;
        line-height: 30px;
        &:hover {
          cursor: pointer;
          background: rgba(245, 247, 250, 0.9);
        }
      }
    }
  }
}
</style>