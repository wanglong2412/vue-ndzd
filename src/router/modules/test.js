import Layout from '@views/layout/layout'

const testRouter = {
  path: '/test',
  component: Layout,
  name: 'Test',
  redirect: '/test/index',
  meta: {
    title: '办公年报',
    noCache: true,
    requireAuth: false
  },
  children: [
    {
      path: 'index',
      name: 'TestIndex',
      components: {
        default: () => import('@views/test/index')
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
      },
      children: [
        {
          path: 'children1',
          name: 'children1',
          components: {
            default: () => import('@views/test/children/children1')
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
        },
        {
          path: 'children2',
          name: 'children2',
          components: {
            default: () => import('@views/test/children/children2')
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
        },
        {
          path: 'children3',
          name: 'children3',
          components: {
            default: () => import('@views/test/children/children3')
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
  ]
}

export default testRouter
