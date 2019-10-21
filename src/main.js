// main.js 从模块化的角度:
// 创建一个vue实例,并挂载对应的属性

// 导入 vue
import Vue from 'vue'
// 导入 根组件
import App from './App.vue'
// 导入路由 router
import router from './router'
// 导入 vuex
import store from './store'
// 导入 vant
import Vant from 'vant'
// 导入axios
// import axios from 'axios'

// 导入自己封装的插件
import AxiosPlugin from '@/utils/request.js'
// 导入 vant 样式
import 'vant/lib/index.css'
// 导入 字体图标
import '@/style/index.css'

// 在vue 中使用 vant
Vue.use(Vant)
// 在Vue 中使用自己封装的插件
// use 的本质 其实是调用 AxiosPlugin 中的install 方法
Vue.use(AxiosPlugin)

Vue.config.productionTip = false

// 创建一个 vue 实例
new Vue({
  router, // 加载路由 router
  store, // 加载 vuex
  render: h => h(App) // 将 app 渲染到 index.html 中含有app 的id 的元素中
}).$mount('#app') // 与el一样
