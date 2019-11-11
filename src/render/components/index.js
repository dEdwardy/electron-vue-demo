import MInput from './MInput/index.vue'
import MSelect from './MSelect/index.vue'

const components = [MInput,MSelect];

const install = function(Vue,config = {}){
    if(install.installed) return;
    components.map(component => {
        Vue.component(component.name,component)
    })

}
/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
  export default {
      install
  }