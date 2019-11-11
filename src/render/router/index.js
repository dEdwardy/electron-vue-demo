import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../../render/views/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component:() => import('../../render/views/home/index.vue')
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
