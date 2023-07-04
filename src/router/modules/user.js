import Layout from '@views/layout/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  name: 'User',
  redirect: '/user/index',
  meta: {
    title: '办公年报',
    noCache: true,
    requireAuth: false
  },
  children: [
    {
      path: 'index',
      name: 'UserIndex',
      components: {
        default: () => import('@views/user/index')
      },
      props: {
        default: route => ({
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

export default userRouter
