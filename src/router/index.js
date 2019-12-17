import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// 获取路由板块

import { SetDocumentTitle } from '../common/utils/global-utils'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/',
    name: '/',
    redirect: { name: 'index' }
  },
  {
    path: '/index',
    name: 'index',
    meta: { title: '首页' },
    component: () => import('@/views/index.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// 路由守卫-前置
router.beforeEach((to, from, next) => {
  // 自动设置页面标题
  if (to.meta && to.meta.title) {
    SetDocumentTitle(to.meta.title)
  }
  next()
})

export default router
