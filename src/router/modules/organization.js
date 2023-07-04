import Layout from '@views/layout/layout'

const organizationRouter = {
  path: '/organization',
  component: Layout,
  name: 'Organization',
  redirect: '/organization/historicalData',
  meta: {
    title: '办公年报',
    noCache: true,
    requireAuth: false
  },
  children: [
    {
      path: 'list',
      name: 'OrganizationList',
      components: {
        default: () => import('@views/organization/list')
      },
      props: {
        default: route => ({
          // id: route.query.id
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

export default organizationRouter
