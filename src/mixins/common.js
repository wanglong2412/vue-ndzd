import { mapState } from 'vuex'
import { isCustomHeader } from '@config/config'
import keepAlive from '@mixins/keepAlive'
import platformJSSDK from '@utils/platformJSSDK'

// import CyuiLayout from '@components/Layout/Layout'
// import CyuiHeader from '@components/Header/index'
// import Scroller from '@components/Scroller'
import NoData from '@components/NoData/NoData.vue'

export default {
  mixins: [keepAlive],
  components: {
    // CyuiLayout,
    // CyuiHeader,
    // Scroller,
    NoData
  },
  data() {
    return {
      isCustomHeader
    }
  },
  computed: {
    ...mapState('organization', {
      organizationId: (state) => state.organizationId
    })
  },
  methods: {
    async goBack() {
      // 页面回退
      // console.log(this.$router)
      let routerName = this.$route.name
      let rootRouterName = [
        'HomeIndex',
        'Report2021',
        'Report2022',
        '401',
        'guide'
      ]
      if (
        rootRouterName.indexOf(routerName) !== -1 ||
        (this.from && this.from === 'workbench')
      ) {
        // closeWindow()
        try {
          let zhjnJSSDK = await platformJSSDK.init()
          await zhjnJSSDK.closeWindow({})
        } catch (error) {
          this.$toast('需要调用原生方法，关闭当前页面，返回工作台！')
        }
      } else {
        this.$router.go(-1)
      }
    },
    async handleClosePage() {
      // 关闭当前页面
      try {
        let zhjnJSSDK = await platformJSSDK.init()
        await zhjnJSSDK.closeWindow({})
      } catch (error) {
        this.$toast('需要调用原生方法，关闭当前页面，返回工作台！')
      }
    },
    formatAccessoryType(type) {
      // 格式化附件图标
      let iconName = ''
      let regImage = /(png|jpg|gif|jpeg|webp)$/
      let regPDF = /(pdf)$/
      let regPPT = /(pptx|ppt|pps|pot|ppa)$/
      let regExcel = /(xls|xlsx)$/
      let regWord = /(doc|docx)$/
      let regTxt = /(txt)$/
      let regZip = /(zip|rar|arj|z)$/
      if (regImage.test(type)) {
        iconName = 'image'
      } else if (regPDF.test(type)) {
        iconName = 'pdf'
      } else if (regPPT.test(type)) {
        iconName = 'ppt'
      } else if (regExcel.test(type)) {
        iconName = 'excel'
      } else if (regWord.test(type)) {
        iconName = 'word'
      } else if (regTxt.test(type)) {
        iconName = 'txt'
      } else if (regZip.test(type)) {
        iconName = 'zip'
      }
      return iconName
    },
    formatPhotos(data) {
      return `${data}/jnbank.png`
    },
    // 回调处理
    async handleCallback({ isError, errorMessage = undefined, response }) {
      if (isError) {
        this.$toast(errorMessage || '获取失败!')
        /* if (errorMessage && errorMessage.includes('timeout')) {
          // 判断是否是网络请求超时
          this.isRefreshPage = true
          this.noDataMessage = '网络请求超时'
        } else if (errorMessage && errorMessage.includes('502')) {
          // 判断是否是服务器错误
          this.isRefreshPage = true
          this.noDataMessage = '服务器错误，502错误'
        } */
      } else {
        return response
      }
    },
    // 操作接口请求
    async handleRequestAPI({
      api,
      params = {},
      isShowLoading = true,
      isNeedCallback = true,
      successMessage = '请求成功！',
      errorMessage = '请求失败！'
    }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          this.isLoading = true
          if (isShowLoading) {
            await this.$store.dispatch('base/SetLoading', true)
          }
          let response = await api(params)
          let result = response.data
          // console.log(result)
          if (
            `${result.code}` === '200' ||
            `${result.status}` === '0000' ||
            result.result
          ) {
            // 请求成功
            resolve(response)
          } else {
            // 请求失败
            if (isNeedCallback) {
              this.handleCallback({
                isError: true,
                errorMessage: result.message || errorMessage
              })
            }
            reject(new Error(result.message || errorMessage))
          }
        } catch (error) {
          // console.log(error)
          if (isNeedCallback) {
            this.handleCallback({
              isError: true,
              errorMessage: error.message || errorMessage
            })
          }
          reject(new Error(error.message || errorMessage))
        } finally {
          this.isLoading = false
          if (isShowLoading) {
            await this.$store.dispatch('base/SetLoading', false)
          }
        }
      })
    }
  },
  watch: {
    // organizationId: { // 判断页面缓存中是否有机构ID
    //   handler: function(newVal, oldVal) {
    //     let { name: routerName, fullPath } = this.$route
    //     let rootRouterName = ['OrganizationList', 'Login', 'Redirect', '401', '404', 'develop', 'error', 'guide']
    //     if (rootRouterName.indexOf(routerName) === -1 && newVal === '') {
    //       this.$router.replace({
    //         name: 'OrganizationList',
    //         query: { redirect: fullPath }
    //       })
    //     }
    //   },
    //   immediate: true
    // }
  }
}
