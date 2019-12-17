import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/app-init.js'
import "lib-flexible/flexible";
import Navigation from 'vue-navigation'

Vue.config.productionTip = false
console.log(process.env)

// keep-alive
Vue.use(Navigation, { router, keyName: 'iu' })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
