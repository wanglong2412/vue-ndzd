import Layout from '@views/layout/layout'

const homeRouter = {
  path: '/home',
  component: Layout,
  name: 'home',
  redirect: '/home/index',
  meta: {
    title: '办公年报',
    noCache: true,
    requireAuth: false
  },
  children: [
    {
      path: 'index',
      name: 'HomeIndex',
      components: {
        default: () => import('@views/home/index')
      },
      props: {
        default: (route) => ({
          // status: route.query.status
        })
      },
      meta: {
        title: '办公年报',
        noCache: true,
        requireAuth: false
      }
    }
  ]
}

export default homeRouter
