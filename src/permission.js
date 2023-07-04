import router from '@router'
import store from '@store'
import { Toast } from 'vant'
import { isNative } from '@config/config'
import { getPageTitle, setDocumentTitle } from '@utils'
import { getStorage } from '@utils/storage'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  console.log(to)
  // 开始进度条
  NProgress.start()

  const { title } = to.meta
  const { redirect, token: hasRouterToken, userId: hasUserId } = to.query // 判断URL地址上有没有token
  // set page title
  // document.title = getPageTitle(to.meta.title)
  if (title && document.title !== title) {
    setDocumentTitle(getPageTitle(to.meta.title))
  }

  // 如果路径上有token
  if (hasRouterToken) await store.dispatch('user/SETSSOToken', hasRouterToken)
  // 如果路径上有userId
  if (hasUserId) await store.dispatch('user/SetUserId', hasUserId)

  const hasToken = getStorage('token') // 判断缓存中有没有token
  // 在智慧江南环境下执行不用判断token
  if (isNative || hasToken || hasRouterToken) {
    // 存在token
    let routerPath = to.path
    let rootRouterPath = ['/login', '/register', '/guide'] // 如果存在token，在这些页面默认自动进入首页
    if (rootRouterPath.indexOf(routerPath) !== -1) {
      if (redirect && redirect !== '/404') {
        next({ path: redirect })
      } else {
        next({ path: '/' })
      }
      NProgress.done()
    } else {
      next()
    }
  } else {
    // 没有token
    if (to.matched.some(r => r.meta.requireAuth)) {
      // 需要登录,跳转到登录页面
      // next({
      //   name: 'Login',
      //   query: { redirect: to.fullPath }
      // })
      next({
        path: '/guide',
        query: {}
      })
      // next()
      NProgress.done()
    } else {
      // 免登录，直接进入
      next()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done() // 结束进度条
  Toast.clear() // 清空所有弹出框
})
