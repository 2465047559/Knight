import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import 'amfe-flexible'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false

// 设置基础URL为后端服务api地址
//axios.defaults.baseURL = "https://api.weixin.qq.com/"

//设置全局，每次ajax请求携带cookies
axios.defaults.withCredentials = true
//解决post没有参数的问题
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


axios.create({
  headers: [{'content-type': 'application/x-www-form-urlencoded'} ,
    {'Content-Type': 'application/json;charset=utf-8'}],// 设置传输内容的类型和编码],

  withCredentials: true,// 指定某个请求应该发送凭据。允许客户端携带跨域cookie，也需要此配置
});



// 将API方法绑定到全局
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
