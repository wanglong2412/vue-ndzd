import router from '@router'
import store from '@store'

/**
 * 返回登录页面
 */
export const returnLogin = ({ redirect } = { redirect: true }) => {
  store.dispatch('user/HandleLogout')
    .then(() => {
      router.replace({
        name: 'Login',
        query: {
          redirect: redirect && router.currentRoute.fullPath
        }
      })
      // location.reload() // 为了重新实例化vue-router对象 避免bug
    })
}

/**
 * 返回401页面
 */
export const return401Page = ({ redirect } = { redirect: true }) => {
  if (router.currentRoute.name !== '401') {
    router.replace({
      name: '401',
      query: {
        redirect: redirect && router.currentRoute.fullPath
      }
    })
  }
}

/**
 * 返回error页面
 */
export const returnErrorPage = ({ redirect } = { redirect: true }) => {
  if (router.currentRoute.name !== 'error') {
    router.push({
      name: 'error',
      query: {
        redirect: redirect && router.currentRoute.fullPath
      }
    })
  }
}
