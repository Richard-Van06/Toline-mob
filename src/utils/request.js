// 管理当前项目里面所有的工具
// 封装所有 与axios 相关的逻辑
// 将逻辑代码添加到这里
// 1. 导入axios实例
// 2. 设置统一的基准地址
// 3. 设置拦截器

// 导入axios
import axios from 'axios'

// 创建一个axios 实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/' // 基准地址
})

// 设置统一的请求基准地址
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/app/v1_0/'
// 上面已经有设置基准地址

// 拦截器
// 请求拦截器
// 原本的axios更换成instance
instance.interceptors.request.use(function (config) {
  // 请求信息
  return config
}, function (error) {
  // 请求失败的逻辑
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 服务器响应的数据
  return response.data.data
}, function (error) {
  // 响应失败的逻辑
  return Promise.reject(error)
})

// 将 axios 挂在到vue 的实例中
// Vue.prototype.$http = axios

// 创建一个插件对象
const MyPlugin = {}
// 添加一个 Install 方法
// install方法 的第一个参数就是Vue Vue是构造器(构造函数)
MyPlugin.install = function (Vue) {
  // 添加逻辑
  // 将 axios实例 挂载在Vue 实例中
  Vue.prototype.$http = instance
}

// 暴露插件对象, 不应该是axios对象---instance
// 导出(暴露) 下面的换成MyPlugin
export default MyPlugin

// 由于将axios封装到request中 没有挂在 vue实例 中
// 那么外面的文件请求服务器就不能用$http 要用instance!!!
// 要请求服务器数据时 每个路由都要导入一次 request
