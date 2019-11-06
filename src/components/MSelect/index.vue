<template>
  <div class="e-select-wrapper" ref="select" v-clickoutside="clickOut">
    <div class="input">
      <input type="text" ref="input" :value="currentValue" :placeholder="placeholder" readonly @click="toggle" />
      <Icon v-show="!isShow" size="30" class="down" @click="toggle" type="md-arrow-dropdown" />
      <Icon v-show="isShow" size="30" class="up" @click="toggle" type="md-arrow-dropup" />
      <ul v-show="isShow">
        <li
          v-for="(item,index) in selectOptions"
          :key="item.value+index"
          @click.stop="handleClickItem(item)"
        >{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import clickoutside from '@/utils/clickoutside'
import { Icon } from "iview";
export default {
  name: "m-select",
  directives:{
    clickoutside
  },
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
      isShow: false,
      currentValue: null
    };
  },
  methods: {
      clickOut(){
          console.log('ooooo')
          console.log(this)
          if(!this.isShow)return;
          this.isShow = false;
      },
    toggle() {
      this.isShow = !this.isShow;
      this.$refs.input.focus();
    },
    handleClickItem(item) {
      this.currentValue = item.label
      // this.$refs.input.value = item.label;
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