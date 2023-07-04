<template>
  <div class="cyui-layout-wrapper cyui-immersion">
    <cyui-layout>
      <template #header>
        <div class="cyui-header-wrapper"
             v-if="isCustomHeader"
             :style="{
            ...{ paddingTop: `${statusbarHeight}px` }
          }">
          <cyui-header :title="headerTitle"
                       @go-back="goBack"
                       @on-close="handleClosePage"
                       style="background-color: transparent;">
            <template #headerRight>
              <div></div>
            </template>
          </cyui-header>
        </div>
      </template>
      <template #default>
        <div class="cyui-slide-fullpage">
          <div class="cyui-slide-fullpage-wrapper"
               ref="slide">
            <div class="cyui-slide-fullpage-content"
                 ref="slide_content"
                 style="will-change: transform;">
              <page-home class="father-page"
                         :current-page-index="fullpageInfo.currentPageIndex"
                         :statusbar-height="statusbarHeight"
                         :sort="sorts['pagehome']"
                         :indicator="indicators['pagehome']"
                         v-on:goNextPage="goNextPage"
                         v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page-home>
              <page-1 class="father-page"
                      :current-page-index="fullpageInfo.currentPageIndex"
                      :statusbar-height="statusbarHeight"
                      :sort="sorts['page1']"
                      :indicator="indicators['page1']"
                      v-on:goNextPage="goNextPage"
                      v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page-1>
              <page-2 class="father-page"
                      :current-page-index="fullpageInfo.currentPageIndex"
                      :statusbar-height="statusbarHeight"
                      :sort="sorts['page2']"
                      :indicator="indicators['page2']"
                      v-on:goNextPage="goNextPage"
                      v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page-2>
              <page-3 class="father-page"
                      :current-page-index="fullpageInfo.currentPageIndex"
                      :statusbar-height="statusbarHeight"
                      :sort="sorts['page3']"
                      :indicator="indicators['page3']"
                      v-on:goNextPage="goNextPage"
                      v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page-3>
              <page-4 class="father-page"
                      :current-page-index="fullpageInfo.currentPageIndex"
                      :statusbar-height="statusbarHeight"
                      :sort="sorts['page4']"
                      :indicator="indicators['page4']"
                      v-on:goNextPage="goNextPage"
                      v-on:goPage="goPage"
                      v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page-4>
              <page4-child1 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page4Son1']"
                            :indicator="indicators['page4']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page4-child1>
              <page4-child2 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page4Son2']"
                            :indicator="indicators['page4']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page4-child2>
              <page4-child3 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page4Son3']"
                            :indicator="indicators['page4']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page4-child3>
              <page4-child4 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page4Son4']"
                            :indicator="indicators['page4']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page4-child4>
              <page-5 class="father-page"
                      :current-page-index="fullpageInfo.currentPageIndex"
                      :statusbar-height="statusbarHeight"
                      :sort="sorts['page5']"
                      :indicator="indicators['page5']"
                      v-on:goNextPage="goNextPage"
                      v-on:goPage="goPage"
                      v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page-5>
              <page5-child1 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page5Son1']"
                            :indicator="indicators['page5']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page5-child1>
              <page5-child2 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page5Son2']"
                            :indicator="indicators['page5']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page5-child2>
              <page5-child3 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page5Son3']"
                            :indicator="indicators['page5']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page5-child3>
              <page5-child4 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page5Son4']"
                            :indicator="indicators['page5']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page5-child4>
              <page-6 class="father-page"
                      :current-page-index="fullpageInfo.currentPageIndex"
                      :statusbar-height="statusbarHeight"
                      :sort="sorts['page6']"
                      :indicator="indicators['page6']"
                      v-on:goNextPage="goNextPage"
                      v-on:goPage="goPage"
                      v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page-6>
              <page6-child1 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page6Son1']"
                            :indicator="indicators['page6']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page6-child1>
              <page6-child2 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page6Son2']"
                            :indicator="indicators['page6']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page6-child2>
              <page6-child3 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page6Son3']"
                            :indicator="indicators['page6']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page6-child3>
              <page6-child4 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page6Son4']"
                            :indicator="indicators['page6']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page6-child4>
              <page6-child5 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page6Son5']"
                            :indicator="indicators['page6']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page6-child5>
              <page6-child6 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page6Son6']"
                            :indicator="indicators['page6']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page6-child6>
              <page6-child7 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page6Son7']"
                            :indicator="indicators['page6']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page6-child7>
              <page6-child8 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page6Son8']"
                            :indicator="indicators['page6']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page6-child8>
              <page-7 class="father-page"
                      :current-page-index="fullpageInfo.currentPageIndex"
                      :statusbar-height="statusbarHeight"
                      :sort="sorts['page7']"
                      :indicator="indicators['page7']"
                      v-on:goNextPage="goNextPage"
                      v-on:goPage="goPage"
                      v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page-7>
              <page7-child1 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page7Son1']"
                            :indicator="indicators['page7']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page7-child1>
              <page7-child2 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page7Son2']"
                            :indicator="indicators['page7']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page7-child2>
              <page7-child3 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page7Son3']"
                            :indicator="indicators['page7']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page7-child3>
              <page-8 class="father-page"
                      :current-page-index="fullpageInfo.currentPageIndex"
                      :statusbar-height="statusbarHeight"
                      :sort="sorts['page8']"
                      :indicator="indicators['page8']"
                      v-on:goNextPage="goNextPage"
                      v-on:goPage="goPage"
                      v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page-8>
              <page8-child1 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page8Son1']"
                            :indicator="indicators['page8']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page8-child1>
              <page8-child2 class="child-page"
                            :current-page-index="fullpageInfo.currentPageIndex"
                            :current-son-index="fullpageInfo.currentSonIndex"
                            :statusbar-height="statusbarHeight"
                            :sort="sorts['page8Son2']"
                            :indicator="indicators['page8']"
                            v-on:goNextPage="goNextPage"
                            v-on:goPage="goPage"
                            v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page8-child2>
              <page-9 class="father-page"
                      :current-page-index="fullpageInfo.currentPageIndex"
                      :statusbar-height="statusbarHeight"
                      :sort="sorts['page9']"
                      :indicator="indicators['page9']"
                      v-on:goNextPage="goNextPage"
                      v-on:goPage="goPage"
                      v-on:solveIndicatorCurrent="solveIndicatorCurrent"></page-9>
            </div>
          </div>
          <div class="cyui-slide-fullpage-dots">
            <span class="cyui-slide-dot"
                  v-for="num in pageLength"
                  :key="num"
                  :class="{ active: indicatorCurrent === num - 1 }"></span>
          </div>
        </div>
      </template>
    </cyui-layout>
  </div>
</template>

<script>
  import common from '@mixins/common'
  import fullpage from './mixins/fullpage'
  import { formatPx2Rem } from '@utils/index'
  import { getStatusBarHeight } from '@utils/mxApi'
  import platformJSSDK from '@utils/platformJSSDK'
  import {
    PageHome,
    Page1,
    Page2,
    Page3,
    Page4,
    Page4Child1,
    Page4Child2,
    Page4Child3,
    Page4Child4,
    Page5,
    Page5Child1,
    Page5Child2,
    Page5Child3,
    Page5Child4,
    Page6,
    Page6Child1,
    Page6Child2,
    Page6Child3,
    Page6Child4,
    Page6Child5,
    Page6Child6,
    Page6Child7,
    Page6Child8,
    Page7,
    Page7Child1,
    Page7Child2,
    Page7Child3,
    Page8,
    Page8Child1,
    Page8Child2,
    Page9
  } from './comps'
  export default {
    name: 'ReportIndex',
    mixins: [common, fullpage],
    components: {
      PageHome,
      Page1,
      Page2,
      Page3,
      Page4,
      Page4Child1,
      Page4Child2,
      Page4Child3,
      Page4Child4,
      Page5,
      Page5Child1,
      Page5Child2,
      Page5Child3,
      Page5Child4,
      Page6,
      Page6Child1,
      Page6Child2,
      Page6Child3,
      Page6Child4,
      Page6Child5,
      Page6Child6,
      Page6Child7,
      Page6Child8,
      Page7,
      Page7Child1,
      Page7Child2,
      Page7Child3,
      Page8,
      Page8Child1,
      Page8Child2,
      Page9
    },
    data() {
      return {
        headerTitle: '',
        statusbarHeight: '0', // 状态栏高度
        pageLength: 0, // 一共有多少页
        isLoading: false, // 是否在加载数据
        sorts: new Object(),
        indicators: new Object()
      }
    },
    props: {},
    computed: {},
    methods: {
      formatPx2Rem,
      initDots() {
        // 获取总账单页面个数
        this.pageLength = Array.from(this.$refs.slide_content.childNodes).filter(
          (item) => {
            return item.classList && item.classList.contains('father-page')
          }
        ).length

        // 对所有页面编排指示器
        let fathersPage = Array.from(this.$refs.slide_content.childNodes).filter(
          (item) => {
            return item.classList && item.classList.contains('father-page')
          }
        )
        fathersPage.forEach((item, index) => {
          this.indicators[item.classList[1]] = index
        })

        // 对所有页面编排序列
        let allPage = Array.from(this.$refs.slide_content.childNodes).filter(
          (item) => {
            return item.classList && !item.classList.contains('hide')
          }
        )
        allPage.forEach((item, index) => {
          this.sorts[item.classList[1]] = index
        })
      },
      goNextPage() {
        // 点击跳转下一页
        if (this.slide) {
          this.slide.next()
        }
      },
      goPage(pagename, time) {
        // 跳转到指定下标的页面
        if (this.slide) {
          if (this.sorts[pagename]) {
            // 跳转的页面存在
            this.slide.goToPage(0, this.sorts[pagename], time)
          } else {
            // 跳转的页面不存在
            let codes = pagename.split('page')[1].split('Son')
            if (codes.length == 1) {
              // 跳转下一个总账单
              this.goPage(`page${+codes[0] + 1}`, 0)
            }
            if (codes.length == 2) {
              // 跳转该账单下的下一个子账单
              this.goPage(`page${codes[0]}Son${+codes[1] + 1}`, 800)
            }
          }
        }
      },
      async initSafeArea() {
        // 适配刘海屏
        try {
          let zhjnJSSDK = await platformJSSDK.init()
          await zhjnJSSDK.iphoneXBottomSetAside({})
        } catch (error) {
          console.log(error)
        }
      },
      async initData() {
        // await Promise.all([this.$store.dispatch('user/GetUserInfo')])
        // let { loginName, userName } = this
        // // 陆向阳特殊处理
        // await this.getUserOAData({
        //   loginName:
        //     loginName === '陆向阳' || loginName === '00002'
        //       ? '00002'
        //       : loginName,
        //   isShowLoading: false
        // })
        // await this.getUserBehaviorStatisticsData({
        //   isShowLoading: false,
        //   loginName:
        //     loginName === '陆向阳' || loginName === '00002'
        //       ? userName
        //       : loginName
        // })
        // 初始化滚动
        this.fullpageInfo.currentPageIndex = 0
        this.slide.refresh()
      }
    },
    filters: {},
    watch: {},
    created() {},
    async mounted() {
      // 适配头部
      getStatusBarHeight({
        onlyStatusBar: true
      })
        .then((response) => {
          console.log('response', response)
          this.statusbarHeight = response
        })
        .catch((error) => {
          console.log(error)
        })
      // 初始化指示器
      this.initDots()
      this.initSafeArea()
      this.init()
      this.initData()
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
  @import '~@assets/styles/themes/default/index';
  @import '~@assets/styles/mixins/index';

  @profilePrefixCls: ~'@{css-prefix}profile';

  // 沉浸式效果
  .@{css-prefix}immersion {
    & /deep/ .@{css-prefix}layout-header {
      position: relative;
      z-index: 200;
    }

    & /deep/ .@{css-prefix}layout-wrapper {
      z-index: 100;
    }

    & /deep/ .@{css-prefix}loading {
      background-color: transparent;
      &-hd {
        width: 120px;
        height: 120px;
        overflow: hidden;

        .pulldown-content {
          position: relative;
          width: 100%;
          height: 80px;
        }
      }
    }
  }

  .@{css-prefix}header-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background-color: transparent;
  }

  .cyui-slide-fullpage {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .cyui-slide-fullpage-wrapper {
      height: 100%;
      overflow: hidden;

      .slide-page {
      }
    }

    .cyui-slide-fullpage-dots {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);

      .cyui-slide-dot {
        display: block;
        margin: 4px 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(192, 192, 192, 0.55);

        &.active {
          height: 20px;
          border-radius: 5px;
        }
      }
    }
  }
  .cyui-slide-fullpage-dots {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);

    .cyui-slide-dot {
      display: block;
      margin: 4px 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #eee;

      &.active {
        height: 20px;
        border-radius: 5px;
      }
    }
  }
</style>