<script>
  export default {
    name: 'Login',
    mixins: [],
    components: {},
    data() {
      return {}
    },
    props: {},
    computed: {},
    methods: {
      async handleLogin() {
        try {
          await Promise.all([
            this.$store.dispatch('user/GetSSOToken'),
            this.$store.dispatch('user/GetUserInfo')
          ])
          /* this.$router.replace({
            path: this.$route.query.redirect || '/'
          }) */
          if (this.$route.query.redirect && this.$route.query.redirect !== '/404') { // 判断是否存在要进入的页面
            this.$router.replace({
              path: this.$route.query.redirect
            })
          } else {
            this.$router.replace({
              path: '/'
            })
          }
          this.$router.go(-1)
        } catch (error) {
          if (error.code === '100010') {
            this.$router.replace({
              path: '/guide'
            })
            this.$router.go(-1)
          } else {
            this.$toast(error.msg || '获取SSOToken失败!')
          }
        }
      },
      async initData() {
        await this.handleLogin()
      }
    },
    watch: {},
    created() {
    },
    mounted() {
    },
    render(h) {
      return h()
    },
    beforeRouteEnter(to, from, next) {
      // console.log(to)
      // console.log(from)
      next(vm => {
        vm.initData()
      })
    },
    beforeRouteUpdate(to, from, next) {
      // console.log(to)
      // console.log(from)
      this.initData()
      next()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/themes/default/index';
  @import '../../assets/styles/mixins/index';

  .@{css-prefix}layout {
    background-color: #fff;
  }
</style>

<style lang="less">
  @import '../../assets/styles/pages/login';
</style>
