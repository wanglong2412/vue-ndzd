import Layout from '@views/layout/layout'

const reportRouter = {
  path: '/report',
  component: Layout,
  name: 'Report',
  redirect: '/report/index',
  meta: {
    title: '办公年报',
    noCache: true,
    requireAuth: false
  },
  children: [
    {
      path: '2021',
      name: 'Report2021',
      components: {
        default: () => import('@views/report/2021/index')
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
    },
    {
      path: '2022',
      name: 'Report2022',
      components: {
        default: () => import('@views/report/2022/index')
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

export default reportRouter
