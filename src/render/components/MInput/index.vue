<template>
  <div class="input">
    <input :type="type" :value="currentValue" @keyup="inputload" :rules ="rules"/>
  </div>
</template>

<script>
import emitter from '../../mixins/emitter'
export default {
  name: "m-input",
  mixins:[emitter],
  props: {
    type: {
      type: String,
      default: "text"
    },
    rules: {
      type: [String, RegExp, Array, Number]
    },
    value: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
      value(val){
        // console.log(val)
          this.setCurrentValue(val)
      },
      rules(...args){
        if(args.length===1){
          this.currentValue = this.currentValue.slice(0,args[0])
        }
      }
  },
  methods: {
    setCurrentValue(value) {
      // console.log(value);
      if (value === this.currentValue) return;
      this.currentValue = value;
    },
    inputload(event) {
      let value = event.target.value;
      // console.log(this.$parent.$children.map(i => {
      //   i.currentValue = value
      //   return i
      // }))
      // console.log(this.$parent.$children.includes(this))
      let arr = _.without(this.$parent.$children,this);
      arr.map(item => {
        item.currentValue = ''
      })
      this.$emit("input", value);
    }
  }
};
</script>

<style>
</style>