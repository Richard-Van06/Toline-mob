import Vue from 'vue'
import Vuex from 'vuex'

// 导入userLocal
import { setUserLocal, getUserLocal } from '@/utils/userlocal'
// 在vue 中使用 vuex
Vue.use(Vuex)
// 创建并导出一个仓库对象
export default new Vuex.Store({
  // 统一管理项目中的公用数据
  state: {
    // 用户信息
    user: getUserLocal()
  },
  // 修改state 中的数据
  mutations: {
    setUser: function (state, obj) {
      // 赋值给 state中的 user
      state.user = obj
      // 储存到 localstorage 中
      setUserLocal(obj)
    }
  }
})
