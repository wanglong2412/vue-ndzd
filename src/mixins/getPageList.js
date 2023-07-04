import { debounce } from 'lodash'
// import moment from 'moment'
// import { getListAPI } from '@api/operationalIndicator'

export default {
  data() {
    return {
      searchKey: {
        page: 1,
        size: 20
      },
      isLoading: false, // 是否在加载数据
      isLastPage: false, // 是否最后一页
      isRefreshPage: false, // 是否需要刷新页面
      noDataMessage: '', // 列表为空时的提示文案
      listData: [] // 列表数据
    }
  },
  props: {},
  computed: {},
  methods: {
    async resetParams({ isPullDown } = { isPullDown: false }) { // 重置参数
      this.searchKey.page = 1
      this.isLoading = false
      this.isLastPage = false
      this.isRefreshPage = false
      this.noDataMessage = ''
      if (!isPullDown) this.listData = []
      this.$refs.scroller && this.$refs.scroller.scrollTo(0, 0, 100)
    },
    async handleRefreshPage() { // 刷新页面
      await this.resetParams()
      await this.getListData()
    },
    handleFilter: debounce(async function() { // 查询，防抖
      await this.resetParams()
      await this.getListData()
    }, 200),
    async handleCallback({ isError, errorMessage = undefined, hasMore = false }) { // 回调处理
      let { listData } = this
      let { scroller } = this.$refs
      if (listData.length === 0) {
        this.noDataMessage = '暂无数据哦～'
        scroller && scroller.forceUpdate(false)
        scroller && scroller.disable()
      } else {
        this.noDataMessage = ''
        scroller && scroller.enable()
        if (!isError && !hasMore) {
          scroller && scroller.forceUpdate(false)
        } else {
          scroller && scroller.forceUpdate(true)
        }
      }
      if (isError) {
        this.searchKey.page--
        this.$toast(errorMessage || '获取失败!')
        if (errorMessage && errorMessage.includes('timeout')) {
          // 判断是否是网络请求超时
          this.isRefreshPage = true
          this.noDataMessage = '网络请求超时'
        } else if (errorMessage && errorMessage.includes('502')) {
          // 判断是否是服务器错误
          this.isRefreshPage = true
          this.noDataMessage = '服务器错误，502错误'
        }
      }
    },
    /**
     * 获取列表数据
     * @param isPullDown 判断下拉刷新、上拉加载
     * @param isShowLoading 判断是否需要loading加载
     * @returns {Promise<void>}
     */
    async getListData({ isPullDown, isShowLoading } = {
      isPullDown: false,
      isShowLoading: true
    }) {
      /* try {
        this.isLoading = true
        if (isShowLoading) await this.$store.dispatch('base/SetLoading', true)
        let { listData } = this
        let { page, size, serId, dataBatch } = this.searchKey
        let response = await getListAPI({
          startpage: page,
          pageSize: size,
          serId: serId,
          dataBatch: dataBatch && moment(dataBatch).format('YYYYMMDD')
        })
        let result = response.data
        // console.log(result)
        if (`${result.status}` === '200') {
          // 请求成功
          let resultData = result.data.listData || []
          let hasMore = resultData.length > 0
          this.listData = !isPullDown
            ? [...listData, ...resultData]
            : [...resultData]
          if (!hasMore) {
            this.isLastPage = true
            // this.$toast('没有更多数据了！')
          }
          await this.handleCallback({
            isError: false,
            hasMore
          })
        } else {
          // 请求失败
          await this.handleCallback({
            isError: true,
            errorMessage: result.message || '获取列表失败!'
          })
        }
      } catch (error) {
        // console.log(error)
        await this.handleCallback({
          isError: true,
          errorMessage: error.message || '获取列表失败!'
        })
      } finally {
        this.isLoading = false
        if (isShowLoading) await this.$store.dispatch('base/SetLoading', false)
      } */
    },
    async initData() {
      await this.resetParams()
      await this.getListData()
    }
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to)
    // console.log(from)
    next()
  },
  beforeRouteUpdate(to, from, next) {
    // console.log(to)
    // console.log(from)
    next()
  }
}
