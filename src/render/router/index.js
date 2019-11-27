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
  },
  {
    path: '/chat',
    name: 'chat',
    component:() => import('../../render/views/chat/index.vue')
  },
  {
    path: '/*',
    redirect:'/'
  },
]

const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to, from ,next) => {
  if(to.name==='login' || localStorage.getItem('Token')){
    next()
  }else{
    next({path: '/',})
  }
}) 

export default router
