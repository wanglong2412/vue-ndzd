<script>
  export default {
    methods: {
      beforeRouterHook(to, from) {
        let { redirect } = to.query
        let rootRouterName = [
          'HomeIndex',
          'UserIndex',
          'Report2021',
          'Report2022'
        ]
        let nextInfo = {
          name: '404',
          query: {}
        }
        if (rootRouterName.indexOf(redirect) !== -1) {
          let query = JSON.parse(JSON.stringify(to.query))
          delete query['redirect']
          nextInfo.name = redirect
          nextInfo.query = query
        }
        return nextInfo
      }
    },
    created() {},
    render: function (h) {
      return h() // avoid warning message
    },
    beforeRouteEnter(to, from, next) {
      // console.log(to)
      // console.log(from)
      let { redirect } = to.query
      if (redirect) {
        next((vm) => {
          let nextInfo = vm.beforeRouterHook(to, from)
          vm.$router.replace(nextInfo).catch(() => {}) // 把error 抛出来
        })
      } else {
        next((vm) => {
          vm.$router
            .replace({
              name: 'Report2022'
            })
            .catch((error) => {
              console.log(error)
            }) // 把error 抛出来
        })
      }
    },
    beforeRouteUpdate(to, from, next) {
      // console.log(to)
      // console.log(from)
      let { redirect } = to.query
      if (redirect) {
        let nextInfo = this.beforeRouterHook(to, from)
        next({
          ...nextInfo,
          ...{
            replace: true
          }
        })
      } else {
        next({
          name: 'Report2022'
        })
      }
    }
  }
</script>
