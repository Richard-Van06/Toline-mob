// 导入 vue
import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'
// 在vue 中使用 VueRouter
Vue.use(VueRouter)

// 创建了一个路由信息对象集合
const routes = [
  {
    // 重定向
    path: '/',
    redirect: '/home'
  },
  {
    // 登录路由
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  // layout 布局路由
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../views/layout'),
    //  layout中的子路由
    children: [
      // 首页路由
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home')
      }
    ]
  }
]

// 创建了一个路由实例
const router = new VueRouter({
  routes // 路由信息的集合
})
// 到处路由实例
export default router
