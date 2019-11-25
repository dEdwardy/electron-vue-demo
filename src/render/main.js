import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from './api'
import Common  from 'components';
import loadsh from 'loadsh'
import VueSocketIO from 'vue-socket.io'
import 'normalize.css'
import 'iview/dist/styles/iview.css';
// import './mock'
import { Icon, Button, Form, FormItem, Input, Radio,Message,Layout,Header,Menu, Sider,Content,
  Submenu,
  MenuItem,Breadcrumb,BreadcrumbItem } from 'iview';
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(new VueSocketIO({
  debug:true,
  connection:'http://localhost:3000'
}))
Vue.use(Common)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Layout)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Sider)
Vue.use(Content)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.prototype.$http = Axios;
Vue.prototype.$Message = Message;
global._ = loadsh;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
