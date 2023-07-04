<template>
  <div class="cyui-layout-wrapper">
    <cyui-layout>
      <template #header>
        <cyui-header v-if="isCustomHeader"
                     :title="headerTitle"
                     @go-back="goBack"
                     @on-close="handleClosePage">
          <template #headerRight>
            <div></div>
          </template>
        </cyui-header>
      </template>
      <template #default>
        <div class="cyui-organization">
          <div class="cyui-organization-list" v-if="listData.length !== 0 && isLoading === false">
            <cyui-layout>
              <template #default>
                <div class="cyui-list">
                  <div class="cyui-list-body">
                    <div
                      class="cyui-list-item"
                      v-for="(item, index) in listData"
                      :key="index"
                      @click="handleSelect(item)"
                    >
                      <div class="cyui-list-line">
                        <div class="cyui-list-content">{{item.bchDesc}}</div>
                        <div class="cyui-list-thumb">
                          <label class="cyui-checkbox-wrapper">
                            <div
                              class="cyui-checkbox"
                              :class="{'cyui-checkbox-checked' : item.isSelected}"
                            >
                              <span class="cyui-checkbox-core"></span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #footer>
                <div class="cyui-footbar">
                  <div class="cyui-footbar-item cyui-footbar-btns">
                    <span
                      class="cyui-btn cyui-btn-primary cyui-btn-radius"
                      @click="handleConfirm"
                    >确定</span>
                  </div>
                </div>
              </template>
            </cyui-layout>
          </div>
          <no-data :msg="noDataMessage" v-else>
            <template #btn>
              <div
                class="cyui-btn cyui-btn-default cyui-btn-inline cyui-btn-radius"
                @click="handleRefreshPage"
                v-if="isRefreshPage"
              >刷新重试
              </div>
            </template>
          </no-data>
        </div>
        <div class="cyui-version">版本号：v{{appVersionName}}</div>
      </template>
    </cyui-layout>
  </div>
</template>

<script>
  // import { mapState } from 'vuex'
  // import { getOrganizationListAPI } from '@/api/organization'
  import { appVersionName } from '@config/config'
  import { return401Page } from '@utils/common'
  import common from '@mixins/common'

  export default {
    name: 'OrganizationList',
    mixins: [common],
    components: {},
    data() {
      return {
        headerTitle: '机构选择',
        appVersionName, // 版本号
        isLoading: false, // 是否在加载数据
        isRefreshPage: false, // 是否需要刷新页面
        noDataMessage: '暂无数据哦～', // 列表为空时的提示文案
        listData: [], // 列表数据
        selectedIndex: '' // 选中的数据
      }
    },
    props: {},
    computed: {
      /* ...mapState('user', {
        organizationId: state => state.organizationId
      }) */
    },
    methods: {
      async goUserIndex(organizationId) { // 进入个人中心首页
        let { query } = this.$route
        await this.$store.dispatch('organization/SetOrganizationId', organizationId)
        if (query.redirect) { // 判断是否存在要进入的页面
          await this.$router.push({
            path: query.redirect
          })
        } else {
          await this.$router.push({
            name: 'UserIndex',
            query: {}
          })
        }
      },
      async resetParams() { // 重置参数
        this.isLoading = false
        this.isRefreshPage = false
        this.noDataMessage = '暂无数据哦～'
        this.listData = []
        this.selectedIndex = ''
      },
      async handleSelect(data) { // 选择
        await this.changeListData(data.bchCde)
      },
      async changeListData(organizationId) { // 列表值切换
        let { listData } = this
        listData.forEach((item, index) => {
          if (item.bchCde === organizationId) {
            this.$set(this.listData[index], 'isSelected', true)
            this.selectedIndex = index
          } else {
            this.$set(this.listData[index], 'isSelected', false)
          }
        })
      },
      async handleConfirm() { // 确定选中
        let { listData, selectedIndex } = this
        if (selectedIndex === '') {
          this.$notify({
            type: 'warning',
            message: '请选择机构!'
          })
          return false
        } else {
          let organizationInfo = listData[selectedIndex]
          await this.goUserIndex(organizationInfo.bchCde)
        }
      },
      async handleCallback({ isError, errorMessage = undefined }) { // 回调处理
        let { listData } = this
        if (listData.length === 0) {
          this.noDataMessage = '暂无数据哦～'
        } else {
          this.noDataMessage = ''
        }
        if (isError) {
          this.$toast(errorMessage || '获取失败!')
          if (errorMessage && errorMessage.includes('timeout')) { // 判断是否是网络请求超时
            this.isRefreshPage = true
            this.noDataMessage = '网络请求超时'
          } else if (errorMessage && errorMessage.includes('502')) { // 判断是否是服务器错误
            this.isRefreshPage = true
            this.noDataMessage = '服务器错误，502错误'
          }
        }
      },
      async handleRefreshPage() { // 刷新页面
        await this.resetParams()
        await this.getOrganizationListData()
      },
      async getOrganizationListData({ isShowLoading } = { isShowLoading: true }) { // 获取列表数据
        try {
          this.isLoading = true
          if (isShowLoading) await this.$store.dispatch('base/SetLoading', true)
          // let { listData } = this
          // let response = await getOrganizationListAPI({})
          let response = await this.$store.dispatch('organization/GetOrganizationList', {
            request: false
          })
          let result = response
          if (`${result.status}` === '0000') { // 请求成功
            let resultData = result.data.listData || []
            this.listData = [...resultData]
            await this.handleCallback({
              isError: false
            })
          } else { // 请求失败
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
        }
      },
      async initSelectedData() { // 初始化选中的数据
        let { isRefreshPage, listData, organizationId } = this
        if (!isRefreshPage) { // 不需要重新刷新页面
          if (listData.length > 0) {
            await this.changeListData(organizationId || listData[0].bchCde)
          } else {
            // 当前员工下没有机构列表默认跳转到401页面
            return401Page()
          }
        }
      },
      async initData() {
        await this.getOrganizationListData()
        await this.initSelectedData()
      }
    },
    watch: {},
    created() {
      this.initData()
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
</script>

<style lang="less" scoped>
  @import '../../assets/styles/themes/default/index';
  @import '../../assets/styles/mixins/index';

  @organizationListPrefixCls: ~'@{css-prefix}organization-list';

  .@{css-prefix}organization {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .@{organizationListPrefixCls} {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    padding: 15px 15px 0;
    background-color: #fff;
    border-radius: 6px;
    transform: translate3d(-50%, -50%, 0);
    overflow: hidden;

    .@{css-prefix}list {
      max-height: 220px;
    }

    .@{css-prefix}list-body {
      .hairline-remove('top');
      .hairline-remove('bottom');

      & /deep/ .@{css-prefix}list-item {
        &:not(:first-child) {
          .hairline('top', 1px, #e6e6e6);
        }
      }
    }
  }

  .@{css-prefix}footbar {
    padding: 15px 10px;

    .@{css-prefix}footbar-btns {
      .@{css-prefix}btn-radius {
        border-radius: 22px;
      }
    }
  }

  .@{css-prefix}version {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translate3d(-50%, 0, 0);
    color: #999;
    line-height: 24px;
    font-size: 12px;
    text-align: center;
  }
</style>
