import Vue from 'vue'
import { lazyloadPic } from '@config/config'

import 'normalize.css' // A modern alternative to CSS resets
import 'animate.css'

import Vant from 'vant'
// import 'vant/lib/index.less'
import './assets/styles/vant.css' // 内网开发，解决使用vant框架上引入的cdn资源
import './assets/styles/index.less' // 样式

// import FastClick from './utils/fastclick' // 为避免浏览器兼容问题引起的点击问题
import App from './App'
import router from './router'
import store from './store'

import 'amfe-flexible/index.js' // 移动端适配

import './icons' // icon
import './permission' // permission control
// import '../mock' // simulation data

// import './plugins/utils'
// import './plugins/table'

import CosyUI from '@components/index'

import VueLazyload from 'vue-lazyload'

// plugins
import './plugins/vConsole'

Vue.use(Vant)
Vue.use(CosyUI)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: lazyloadPic,
  loading: lazyloadPic,
  attempt: 1
})

// FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
