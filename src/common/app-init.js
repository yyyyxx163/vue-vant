/**
 * 应用初始化
 * @Crearte: 2019-11-06
 * @Author: yyx (yyyyxx163@163.com)
 */

import Vue from 'vue'
// import '@/common/utils/rem.js'
import '@/assets/iconfont/iconfont.css'
import $utils from '@/common/utils/global-utils'
import store from '@/store'
import Vant from 'vant'
import 'vant/lib/index.css'

// 初始化挂载
const _initMount = () => {
  Vue.prototype.$utils = $utils
}

// 初始化vant-ui
const _initVantUi = () => {
  Vue.use(Vant)
}

// 初始化全局模板
const _initGlobalComponents = () => {
  Vue.component('g-page-footer', () => import('@/components/common/g-page-footer'))
}

// 初始化用户会话信息
const _initUserSession = () => {
  store.dispatch('userSession/initInfo')
}


const init = () => {
  // 初始化挂载
  _initMount()

  // 初始化vantui
  _initVantUi()

  // 初始化全局模块
  _initGlobalComponents()

  // 初始化用户会话信息
  _initUserSession()
}
init()
