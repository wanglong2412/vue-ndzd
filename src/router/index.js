import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
// import Layout from '@views/layout/layout'

/* Router Modules */
// import organizationRouter from './modules/organization'
import userRouter from './modules/user'
import testRouter from './modules/test'
import homeRouter from './modules/home'
import reportRouter from './modules/report'
Vue.use(Router)

/**
 path: string;
 component?: Component;
 name?: string; // 命名路由
 components?: { [name: string]: Component }; // 命名视图组件
 redirect?: string | Location | Function;
 props?: boolean | Object | Function;
 meta : {
    title: 'title' // 页面标题
    noCache: true // 是否keep-alive
    requireAuth: false // 是否需要登录权限
  }
 children?: Array<RouteConfig>; // 嵌套路由
 **/
export const constantRoutes = [
  {
    path: '/redirect',
    component: () => import('@views/redirect/index'),
    name: 'Redirect'
  },
  {
    path: '/login',
    component: () => import('@views/login/login'),
    name: 'Login'
  },
  {
    path: '/401',
    component: () => import('@views/401'),
    name: '401'
  },
  {
    path: '/404',
    component: () => import('@views/404'),
    name: '404'
  },
  {
    path: '/error',
    component: () => import('@views/error'),
    name: 'error'
  },
  {
    path: '/develop',
    component: () => import('@views/develop'),
    name: 'develop'
  },
  {
    path: '/guide',
    component: () => import('@views/guide'),
    name: 'guide'
  },
  {
    path: '/',
    redirect: '/redirect'
  },
  // organizationRouter,
  reportRouter,
  userRouter,
  testRouter,
  homeRouter,
  {
    path: '*',
    redirect: '/404'
  }
]

export const asyncRoutes = []

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
