import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import i18n from '@/i18n/'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import './assets/iconfont/iconfont.css' // 引入 阿里图标库

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value) // 兼容 vue-i18n@6.x
})
Vue.config.productionTip = false

import '@/filter' // 引入全局过滤器
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})
