import { debounce } from 'lodash'

export default {
  data () {
    return {
      scrollbarConfig: { // 是否开启滚动条
        fade: true
      },
      pullDownRefreshConfig: { // 配置下拉刷新功能
        threshold: 100,
        stop: 80,
        downText: '下拉刷新',
        upText: '释放更新',
        loadingText: '加载中 ...',
        resultText: '刷新成功'
      },
      pullUpLoadConfig: { // 配置上拉加载更多
        threshold: 0,
        txt: {
          more: '加载更多',
          noMore: '没有更多数据了'
        }
      },
      startY: 0, // 纵轴方向初始化位置
      searchKey: {
        page: 1,
        size: 20
      }
    }
  },
  props: {},
  computed: {},
  methods: {
    async resetParams () { // 重置参数
    },
    async handleRefreshPage () { // 刷新页面
    },
    handleFilter: debounce(async function () { // 查询，防抖
    }, 200),
    async handlePullingDown () { // 下拉刷新
      // this.searchKey.page = 1
      await this.resetParams({
        isPullDown: true
      })
      await this.getListData({
        isPullDown: true,
        isShowLoading: false
      })
    },
    async handlePullingUp () { // 上拉加载
      this.searchKey.page++
      await this.getListData({
        isShowLoading: false
      })
    },
    async getListData ({ isPullDown, isShowLoading } = { isPullDown: false, isShowLoading: true }) { // 获取列表数据
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
