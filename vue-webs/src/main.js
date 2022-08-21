import Vue from 'vue'
import axios from 'axios'
import VueAxiosPlugin from 'vue-axios-plugin'
import App from './App.vue'
import router from './router'

import store from './store'
//饿了么UI引入
import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import './assets/css/globle.css'
import 'element-ui/lib/theme-chalk/index.css'
//antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import moment from 'moment'
import cookies from 'vue-cookies'
Vue.config.productionTip = false
Vue.prototype.$message = Message
// vue.prototype.$moment = moment //赋值使用
// vue.prototype.$cookies = cookies

Vue.use(Antd)
Vue.use(ElementUI, { size: 'big' })
Vue.use(VueQuillEditor)
Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error),
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
