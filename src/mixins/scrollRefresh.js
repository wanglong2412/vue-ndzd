export default {
  data () {
    return {
      scrollbarConfig: { // 是否开启滚动条
        fade: true
      },
      pullDownRefreshConfig: { // 配置下拉刷新功能
        threshold: 100,
        stop: 100,
        downText: '下拉刷新',
        upText: '释放更新',
        loadingText: '加载中 ...',
        resultText: '刷新成功'
      },
      startY: 0, // 纵轴方向初始化位置
      isPullDownRefresh: false
    }
  },
  props: {},
  computed: {},
  methods: {
    async resetParams () { // 重置参数
    },
    async handleRefreshPage () { // 刷新页面
    },
    async handlePullingDown () { // 下拉刷新
      this.isPullDownRefresh = true
      await this.initData()
    },
    async getPageData () { // 获取页面数据
    },
    async initData () {
    }
  },
  watch: {},
  created () {
  },
  mounted () {
  }
}
