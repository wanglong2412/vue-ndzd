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
            <div class="cyui-slide-fullpage-content">
              <div class="slide-page pagehome">
                <div class="cyui-page-wrapper cyui-page-name"
                     :style="{
                    ...{ paddingTop: `${statusbarHeight}px` }
                  }">
                  {{ userName || '-' }}的办公年报
                </div>
                <transition enter-active-class="animate__animated animate__fadeInRight"
                            leave-active-class="animate__animated animate__fadeOutRight animate__faster">
                  <div class="img1"
                       :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 50) * 2
                        )}rem`
                      }
                    }"
                       v-if="`${fullpageInfo.currentPageIndex}` === '0'">
                    <img src="../../assets/images/user/pagehome-img1.png"
                         alt="" />
                  </div>
                </transition>
                <transition enter-active-class="animate__animated animate__fadeInLeft animate__delay-1s"
                            leave-active-class="animate__animated animate__fadeOutLeft animate__faster">
                  <div class="img2"
                       v-if="`${fullpageInfo.currentPageIndex}` === '0'">
                    <img src="../../assets/images/user/pagehome-img2.png"
                         alt="" />
                  </div>
                </transition>
                <div class="down"
                     @click="goNext"></div>
              </div>
              <div class="slide-page page1">
                <div class="cyui-page-wrapper cyui-page-name"
                     :style="{
                    ...{ paddingTop: `${statusbarHeight}px` }
                  }">
                  {{ userName || '-' }}的办公年报
                </div>
                <transition enter-active-class="animate__animated animate__lightSpeedInRight animate__fast"
                            leave-active-class="animate__animated animate__lightSpeedOutRight animate__faster">
                  <div class="cyui-page-wrapper cyui-page-section1"
                       :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 50) * 2
                        )}rem`
                      }
                    }"
                       v-if="`${fullpageInfo.currentPageIndex}` === '1'">
                    <div class="cyui-page-section1-content">
                      <div class="cyui-page-section1-content-item">
                        <div class="cyui-page-section">
                          <div class="cyui-page-section-hd">
                            你登录智慧江南
                          </div>
                          <div class="cyui-page-section-bd">
                            <div class="cyui-page-section-flexbox-align-end">
                              <div class="fw fs36 color-yellow">
                                {{
                                  detailInfo.zhjnData.login.total_count || '0'
                                }}
                              </div>
                              <div class="pb3 fs18">
                                &nbsp;次
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="cyui-page-section1-content-item">
                        <div class="cyui-page-section">
                          <div class="cyui-page-section-hd color-red">
                            {{ applicationUseMost.name || '-' }}
                          </div>
                          <div class="cyui-page-section-bd">
                            <div class="fs22 fontFZZongYi">
                              是使用最多的功能
                            </div>
                            <div class="cyui-page-section-flexbox-align-end pt10">
                              <div class="pb3 fs18">
                                共打开&nbsp;
                              </div>
                              <div class="fw fs36 color-yellow">
                                {{ applicationUseMost.click || '0' }}
                              </div>
                              <div class="pb3 fs18">
                                &nbsp;次
                              </div>
                            </div>
                            <div class="cyui-page-section-flexbox-align-end pt10">
                              <div class="pb3 fs18">
                                共停留&nbsp;
                              </div>
                              <div class="fw fs36 color-yellow">
                                {{
                                  applicationUseMost.stay
                                    ? Math.round(
                                        (applicationUseMost.stay / 60) * 100
                                      ) / 100
                                    : '0'
                                }}
                              </div>
                              <div class="pb3 fs18">
                                &nbsp;小时
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
                <transition enter-active-class="animate__animated animate__lightSpeedInLeft animate__fast"
                            leave-active-class="animate__animated animate__lightSpeedOutLeft animate__faster">
                  <div class="cyui-page-wrapper cyui-page-section5"
                       v-if="`${fullpageInfo.currentPageIndex}` === '1'">
                    <div class="cyui-page-section5-title">你常用的功能有</div>
                    <div class="cyui-page-section5-application">
                      <div v-for="(item, index) in applicationListData"
                           :key="`application${index}`">
                        {{ item.name }}
                      </div>
                    </div>
                  </div>
                </transition>
                <div class="down"
                     @click="goNext"></div>
              </div>
              <div class="slide-page page2">
                <div class="cyui-page-wrapper cyui-page-name"
                     :style="{
                    ...{ paddingTop: `${statusbarHeight}px` }
                  }">
                  {{ userName || '-' }}的办公年报
                </div>
                <div style="position: absolute; left: 50%; top: 47%; transform: translate3d(-50%,-50%,0); width: 100%;">
                  <transition enter-active-class="animate__animated animate__flipInY"
                              leave-active-class="animate__animated animate__flipOutY animate__faster">
                    <div class="cyui-page2-wrapper cyui-page2-section1"
                         v-if="`${fullpageInfo.currentPageIndex}` === '2'">
                      <div class="cyui-page2-section1-title">智慧江南</div>
                      <div class="cyui-page2-section1-content">
                        <div class="cyui-page2-section1-content-item">
                          <div class="fontFZZongYi">全年日均访问量</div>
                          <div class="cyui-flexbox cyui-flexbox-justify-start cyui-flexbox-align-end">
                            <div class="fs28 fw color-yellow">
                              21.07万
                            </div>
                            <div>
                              &nbsp;人次，比上年上涨
                              <span class="fw color-yellow">
                                62%
                              </span>
                            </div>
                          </div>
                          <div>
                            <span class="fw color-yellow">5月7日</span>
                            达到峰值
                          </div>
                          <div>
                            日访问量
                            <span class="fw color-yellow">72.21万</span>
                            人次
                          </div>
                        </div>
                        <div class="cyui-page2-section1-content-item">
                          <div class="fontFZZongYi">全年日均活跃用户</div>
                          <div class="cyui-flexbox cyui-flexbox-justify-start cyui-flexbox-align-end">
                            <div class="fs28 fw color-yellow">
                              2074
                            </div>
                            <div style="padding-bottom: 0.09rem;">
                              &nbsp;人，比上年上涨
                              <span class="fw color-yellow">24%</span>
                            </div>
                          </div>
                          <div>
                            <span class="fw color-yellow">11月18日</span>
                            达到峰值，登录用户
                            <span class="fw color-yellow">3065</span>
                            人
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                  <transition enter-active-class="animate__animated animate__flipInX"
                              leave-active-class="animate__animated animate__flipOutX animate__faster">
                    <div class="cyui-page2-wrapper cyui-page2-section5"
                         v-if="`${fullpageInfo.currentPageIndex}` === '2'">
                      <div class="cyui-page2-section5-title">
                        常用应用年访问量
                      </div>
                      <div class="cyui-page2-section5-top">TOP10</div>
                      <div class="cyui-page2-section5-application">
                        <div>
                          <div>移动OA</div>
                          <div>670993</div>
                        </div>
                        <div>
                          <div>一起富阳光贷</div>
                          <div>542535</div>
                        </div>
                        <div>
                          <div>江南薪酬</div>
                          <div>130503</div>
                        </div>
                        <div>
                          <div>领导驾驶舱</div>
                          <div>106497</div>
                        </div>
                        <div>
                          <div>客户走访</div>
                          <div>99796</div>
                        </div>
                        <div>
                          <div>信用卡查询</div>
                          <div>59791</div>
                        </div>
                        <div>
                          <div>储蓄查询</div>
                          <div>40949</div>
                        </div>
                        <div>
                          <div>信贷大集中</div>
                          <div>31879</div>
                        </div>
                        <div>
                          <div>企业网银</div>
                          <div>29263</div>
                        </div>
                        <div>
                          <div>工作日志</div>
                          <div>39810</div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
                <div class="down"
                     @click="goNext"></div>
              </div>
              <div class="slide-page page3">
                <div class="cyui-page-wrapper cyui-page-name"
                     :style="{
                    ...{ paddingTop: `${statusbarHeight}px` }
                  }">
                  {{ userName || '-' }}的办公年报
                </div>
                <div class="cyui-page-wrapper cyui-page-section1"
                     :style="{
                    ...{
                      paddingTop: `${formatPx2Rem(
                        (statusbarHeight + 40) * 2
                      )}rem`
                    }
                  }">
                  <div class="cyui-page-section1-content">
                    <transition enter-active-class="animate__animated animate__fadeInRight animate__faster"
                                leave-active-class="animate__animated animate__fadeOutRight animate__faster">
                      <div class="cyui-page-section1-content-item"
                           v-if="`${fullpageInfo.currentPageIndex}` === '3'">
                        <div class="fontFZZongYi">你登录OA</div>
                        <div class="cyui-flexbox cyui-flexbox-justify-start cyui-flexbox-align-end">
                          <div class="fs36 fw color-yellow">
                            {{ detailInfo.oaData['T'] || '0' }}
                          </div>
                          <div style="padding-bottom: 0.1rem;">
                            &nbsp;次
                          </div>
                        </div>
                      </div>
                    </transition>
                    <transition enter-active-class="animate__animated animate__fadeInRight animate__faster animate__delay-0-5s"
                                leave-active-class="animate__animated animate__fadeOutRight animate__faster">
                      <div class="cyui-page-section1-content-item"
                           v-if="`${fullpageInfo.currentPageIndex}` === '3'">
                        <div class="fontFZZongYi">OA在线</div>
                        <div class="cyui-flexbox cyui-flexbox-justify-start cyui-flexbox-align-end">
                          <div class="fs36 fw color-yellow">
                            {{ detailInfo.oaData['E'] || '0' }}
                          </div>
                          <div style="padding-bottom: 0.1rem;">
                            &nbsp;小时，日均
                            <span class="fw color-yellow">
                              {{
                                detailInfo.oaData['F']
                                  ? Math.round(
                                      (detailInfo.oaData['F'] / 60) * 100
                                    ) / 100
                                  : '0'
                              }}
                            </span>
                            小时
                          </div>
                        </div>
                      </div>
                    </transition>
                    <transition enter-active-class="animate__animated animate__fadeInRight animate__faster animate__delay-1s"
                                leave-active-class="animate__animated animate__fadeOutRight animate__faster">
                      <div class="cyui-page-section1-content-item"
                           v-if="`${fullpageInfo.currentPageIndex}` === '3'">
                        <div class="fontFZZongYi">共查看</div>
                        <div class="cyui-flexbox cyui-flexbox-justify-start cyui-flexbox-align-end">
                          <div style="padding-bottom: 0.1rem;">全行&nbsp;</div>
                          <div class="fs36 fw color-yellow">
                            {{
                              detailInfo.oaData['G']
                                ? Math.round(
                                    detailInfo.oaData['G'] * 100 * 100
                                  ) / 100
                                : '0'
                            }}%
                          </div>
                          <div style="padding-bottom: 0.1rem;">
                            &nbsp;的新闻公告
                          </div>
                        </div>
                        <div class="cyui-flexbox cyui-flexbox-justify-start cyui-flexbox-align-end">
                          <div style="padding-bottom: 0.1rem;">
                            全行共发布&nbsp;
                          </div>
                          <div class="fs36 fw color-yellow">4799</div>
                          <div style="padding-bottom: 0.1rem;">
                            &nbsp;个新闻公告
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
                <!--<div class="cyui-page-wrapper cyui-page-img">
                  <img src="../../assets/images/user/page3-img1.png" alt="" />
                </div>-->
                <div class="down"
                     @click="goNext"></div>
              </div>
              <div class="slide-page page4">
                <div class="cyui-page-wrapper cyui-page-name"
                     :style="{
                    ...{ paddingTop: `${statusbarHeight}px` }
                  }">
                  {{ userName || '-' }}的办公年报
                </div>
                <div class="cyui-page-wrapper cyui-page-section1"
                     :style="{
                    ...{
                      paddingTop: `${formatPx2Rem(
                        (statusbarHeight + 30) * 2
                      )}rem`
                    }
                  }">
                  <div class="cyui-page-section1-content">
                    <transition enter-active-class="animate__animated animate__fadeInRight animate__faster"
                                leave-active-class="animate__animated animate__fadeOutRight animate__faster">
                      <div class="cyui-page-section1-content-item"
                           v-if="`${fullpageInfo.currentPageIndex}` === '4'">
                        <div class="fontFZZongYi color-yellow">
                          {{ detailInfo.oaData['H'] || '-' }}
                        </div>
                        <div class="fw"
                             style="font-size: 0.6rem;">
                          同事
                          <span style="color: #C31313;">找你最多</span>
                          的一天
                        </div>
                        <div class="fw"
                             style="font-size: 0.6rem;">
                          收到OA邮件最多（共
                          {{ detailInfo.oaData['I'] || '0' }}个）
                        </div>
                      </div>
                    </transition>
                    <transition enter-active-class="animate__animated animate__fadeInLeft animate__faster animate__delay-0-5s"
                                leave-active-class="animate__animated animate__fadeOutLeft animate__faster">
                      <div class="cyui-page-section1-content-item"
                           v-if="`${fullpageInfo.currentPageIndex}` === '4'">
                        <div class="fontFZZongYi color-yellow">
                          {{ detailInfo.oaData['J'] || '-' }}
                        </div>
                        <div class="fw"
                             style="font-size: 0.6rem;">
                          你
                          <span style="color: #C31313;">工作最忙</span>
                          的一天
                        </div>
                        <div class="fw"
                             style="font-size: 0.6rem;">
                          发送OA邮件最多（共
                          {{ detailInfo.oaData['K'] || '0' }}个）
                        </div>
                      </div>
                    </transition>
                    <transition enter-active-class="animate__animated animate__fadeInRight animate__faster animate__delay-1s"
                                leave-active-class="animate__animated animate__fadeOutRight animate__faster">
                      <div class="cyui-page-section1-content-item"
                           v-if="`${fullpageInfo.currentPageIndex}` === '4'">
                        <div class="fontFZZongYi">你全年收到邮件</div>
                        <div class="cyui-flexbox cyui-flexbox-justify-start cyui-flexbox-align-end">
                          <div class="fs36 fw color-yellow">
                            {{ detailInfo.oaData['L'] || '0' }}
                          </div>
                          <div style="padding-bottom: 0.1rem;">
                            &nbsp;个
                          </div>
                        </div>
                        <div>
                          超过了
                          {{
                            detailInfo.oaData['M']
                              ? Math.round(detailInfo.oaData['M'] * 100 * 100) /
                                100
                              : '0'
                          }}
                          %用户
                        </div>
                      </div>
                    </transition>
                    <transition enter-active-class="animate__animated animate__fadeInLeft animate__faster animate__delay-1-5s"
                                leave-active-class="animate__animated animate__fadeOutLeft animate__faster">
                      <div class="cyui-page-section1-content-item"
                           v-if="`${fullpageInfo.currentPageIndex}` === '4'">
                        <div class="fontFZZongYi">你全年发送邮件</div>
                        <div class="cyui-flexbox cyui-flexbox-justify-start cyui-flexbox-align-end">
                          <div class="fs36 fw color-yellow">
                            {{ detailInfo.oaData['N'] || '0' }}
                          </div>
                          <div style="padding-bottom: 0.1rem;">
                            &nbsp;个
                          </div>
                        </div>
                        <div>
                          超过了
                          {{
                            detailInfo.oaData['O']
                              ? Math.round(detailInfo.oaData['O'] * 100 * 100) /
                                100
                              : '0'
                          }}
                          %用户
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
                <div class="down"
                     @click="goNext"></div>
              </div>
              <div class="slide-page page5">
                <div class="cyui-page-wrapper cyui-page-name"
                     :style="{
                    ...{ paddingTop: `${statusbarHeight}px` }
                  }">
                  {{ userName || '-' }}的办公年报
                </div>
                <div class="cyui-page-wrapper cyui-page-section1"
                     :style="{
                    ...{
                      paddingTop: `${formatPx2Rem(
                        (statusbarHeight + 30) * 2
                      )}rem`
                    }
                  }">
                  <div class="cyui-page-section1-content">
                    <transition enter-active-class="animate__animated animate__fadeInDown"
                                leave-active-class="animate__animated animate__fadeOutUp animate__faster">
                      <div class="cyui-page-section1-content-item"
                           v-if="`${fullpageInfo.currentPageIndex}` === '5'">
                        <div class="fontFZZongYi color-yellow">
                          {{ detailInfo.oaData['P'] || '-' }}
                        </div>
                        <div class="fw"
                             style="font-size: 0.6rem;">
                          是你发送协同<span style="color: #C31313;">最早的时间</span>
                        </div>
                      </div>
                    </transition>
                    <transition enter-active-class="animate__animated animate__fadeInUp"
                                leave-active-class="animate__animated animate__fadeOutDown animate__faster">
                      <div class="cyui-page-section1-content-item"
                           v-if="`${fullpageInfo.currentPageIndex}` === '5'">
                        <div class="fontFZZongYi color-yellow">
                          {{ detailInfo.oaData['Q'] || '-' }}
                        </div>
                        <div class="fw"
                             style="font-size: 0.6rem;">
                          是你处理协同<span style="color: #C31313;">最晚的时间</span>
                        </div>
                        <div>
                          处理协同的平均时间为
                          {{
                            detailInfo.oaData['R']
                              ? Math.round(detailInfo.oaData['R'] * 100) / 100
                              : '0'
                          }}
                          分钟，
                        </div>
                        <div style="color: #C31313;">
                          部门排名 {{ detailInfo.oaData['S'] || '-' }}
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
                <div class="down"
                     @click="goNext"></div>
              </div>
              <div class="slide-page page6">
                <div class="cyui-page-wrapper cyui-page-name"
                     :style="{
                    ...{ paddingTop: `${statusbarHeight}px` }
                  }">
                  {{ userName || '-' }}的办公年报
                </div>
                <transition enter-active-class="animate__animated animate__zoomIn"
                            leave-active-class="animate__animated animate__zoomOut animate__faster">
                  <div class="img1"
                       :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 50) * 2
                        )}rem`
                      }
                    }"
                       v-if="`${fullpageInfo.currentPageIndex}` === '6'">
                    <img src="../../assets/images/user/page6-img1.png"
                         alt="" />
                  </div>
                </transition>
                <transition enter-active-class="animate__animated animate__fadeInUp animate__delay-1-5s"
                            leave-active-class="animate__animated animate__fadeOutDown animate__faster">
                  <div class="cyui-btns"
                       v-if="`${fullpageInfo.currentPageIndex}` === '6'">
                    <button type="button"
                            class="cyui-btn cyui-btn-primary cyui-btn-block"
                            @click="goBack">
                      返回工作台
                    </button>
                  </div>
                </transition>
                <transition enter-active-class="animate__animated animate__fadeInLeft animate__delay-1s"
                            leave-active-class="animate__animated animate__fadeOutLeft animate__faster">
                  <div class="img2"
                       v-if="`${fullpageInfo.currentPageIndex}` === '6'">
                    <img src="../../assets/images/user/page6-img2.png"
                         alt="" />
                  </div>
                </transition>
                <!-- <div class="cyui-page-wrapper cyui-page-qrcode">
                  <img
                    src="https://oa.jnbank.com.cn/m/static/img/oa.da8f4df3.png"
                    alt=""
                  />
                </div> -->
              </div>
            </div>
          </div>
          <div class="cyui-slide-fullpage-dots">
            <span class="cyui-slide-dot"
                  v-for="num in pageLength"
                  :key="num"
                  :class="{ active: fullpageInfo.currentPageIndex === num - 1 }"></span>
          </div>
        </div>
        <van-popup class="cyui-loading"
                   :overlay="false"
                   v-model="isLoading">
          <div class="cyui-loading-hd">
            <lottie class="cyui-loading-icon"
                    :options="lottieInfo.options"
                    @animCreated="handleLottieCreated" />
          </div>
        </van-popup>
      </template>
    </cyui-layout>
  </div>
</template>

<script>
  import Lottie from 'vue-lottie'
  import * as animationData from '@assets/lottie/refresh.json'
  import { mapGetters } from 'vuex'
  import common from '@mixins/common'
  import fullpage from './mixins/fullpage'
  import getUserOAData from './mixins/getUserOAData'
  import platformJSSDK from '@utils/platformJSSDK'
  import { getStatusBarHeight } from '@utils/mxApi'
  import { formatPx2Rem } from '@utils/index'
  import { getUserBehaviorStatisticsAPI } from '@api/user'

  export default {
    name: 'UserIndex',
    mixins: [common, fullpage, getUserOAData],
    components: {
      Lottie
    },
    data() {
      return {
        headerTitle: '',
        statusbarHeight: '0', // 状态栏高度
        pageLength: 7, // 一共有多少页
        isLoading: false, // 是否在加载数据
        lottieInfo: {
          lottieObject: null,
          options: { animationData: animationData.default }
        },
        detailInfo: {
          // 详情数据
          zhjnData: {
            apps: [],
            login: {}
          },
          oaData: {}
        }
      }
    },
    props: {},
    computed: {
      ...mapGetters(['loginName', 'userName']),
      applicationListData() {
        let { apps } = this.detailInfo.zhjnData
        let resultData = apps.sort(function (a, b) {
          return b.click - a.click
        })
        return resultData.slice(0, 10)
      },
      applicationUseMost() {
        return this.applicationListData[0] || {}
      }
    },
    methods: {
      formatPx2Rem,
      handleLottieCreated(obj) {
        this.lottieInfo.lottieObject = obj
      },
      async getUserBehaviorStatisticsData(
        { isShowLoading, loginName } = {
          isShowLoading: true,
          loginName: ''
        }
      ) {
        try {
          let params = {
            app_ids: [].join(),
            department_ids: [].join(),
            query_name: loginName,
            date_from: '2021-01-01',
            date_to: '2021-12-31',
            page: '1',
            page_size: '1000000'
          }
          let { data: result } = await this.handleRequestAPI({
            api: getUserBehaviorStatisticsAPI,
            params,
            isShowLoading,
            errorMessage: '获取失败!'
          })
          console.log(result)
          let resultData = result.result || [{}]
          this.detailInfo.zhjnData = resultData[0]
          return Promise.resolve('获取成功！')
        } catch (error) {
          // console.log(error)
          return Promise.reject(error)
        }
      },
      async initSafeArea() {
        // 适配刘海屏
        try {
          let zhjnJSSDK = await platformJSSDK.init()
          // let response = await zhjnJSSDK.getStatusBarHeight({})
          // console.log('response', response)
          // this.statusbarHeight = response
          await zhjnJSSDK.iphoneXBottomSetAside({})
        } catch (error) {
          console.log(error)
        }
      },
      async initData() {
        await Promise.all([this.$store.dispatch('user/GetUserInfo')])
        let { loginName, userName } = this
        // 陆向阳特殊处理
        await this.getUserOAData({
          loginName:
            loginName === '陆向阳' || loginName === '00002' ? '00002' : loginName,
          isShowLoading: false
        })
        await this.getUserBehaviorStatisticsData({
          isShowLoading: false,
          loginName:
            loginName === '陆向阳' || loginName === '00002' ? userName : loginName
        })
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
  @import '../../assets/styles/themes/default/index';
  @import '../../assets/styles/mixins/index';

  @profilePrefixCls: ~'@{css-prefix}profile';

  // FZZongYi-M05
  //@font-face {
  //  font-family: 'FZZongYi-M05';
  //  src: url('../../assets/font/FZZongYi-M05.eot');
  //  src: url('../../assets/font/FZZongYi-M05.eot#iefix')
  //      format('embedded-opentype'),
  //    url('../../assets/font/FZZongYi-M05.woff') format('woff'),
  //    url('../../assets/font/FZZongYi-M05.ttf') format('truetype'),
  //    url('../../assets/font/FZZongYi-M05.svg#iconfont') format('svg');
  //}

  .fs36 {
    font-size: 36px;
  }

  .fs32 {
    font-size: 32px;
  }

  .fs28 {
    font-size: 28px;
  }

  .fs24 {
    font-size: 24px;
  }

  .fs22 {
    font-size: 22px;
  }

  .fs18 {
    font-size: 18px;
  }

  .pt10 {
    padding-top: 10px;
  }

  .pb3 {
    padding-bottom: 3px;
  }

  .fw {
    font-weight: bold;
  }

  .fontFZZongYi {
    font-family: FZZongYi-M05;
    font-weight: bold;
  }

  .color-yellow {
    color: #cf953d !important;
  }

  .color-red {
    color: #c31313 !important;
  }

  // 沉静式效果
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
        background: #eee;

        &.active {
          height: 20px;
          border-radius: 5px;
        }
      }
    }
  }

  .slide-page {
    position: relative;

    .@{css-prefix}page-wrapper {
      text-align: left;
    }

    .@{css-prefix}page-name {
      position: absolute;
      top: 0;
      right: 0;
      padding-right: 15px;
      text-align: right;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      line-height: 44px;
      color: #cf953d;
    }

    .@{css-prefix}page-img {
      margin-top: 60px;
      text-align: center;

      > img {
        display: inline-block;
        width: 245px;
      }
    }

    .@{css-prefix}page-qrcode {
      position: absolute;
      right: 10px;
      bottom: 20px;
      width: 87px;
      height: 87px;
      padding: 5px;
      background-color: #ffffff;

      > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    // 模块
    .@{css-prefix}page-section1 {
      padding-top: 50px;
      padding-left: 25px;

      &-title {
        font-size: 22px;
        font-family: FZZongYi-M05;
        font-weight: bold;
        line-height: 1;
        color: #4c4c4c;
      }

      &-content {
        &-item {
          padding-top: 20px;
          font-size: 18px;
          font-weight: 400;
          color: #4c4c4c;
          line-height: 1;

          > div {
            padding-top: 10px;

            &:first-of-type {
              font-size: 36px;
              color: #4c4c4c;
            }
          }

          // 模块
          .@{css-prefix}page-section {
            &-hd {
              font-size: 36px;
              font-family: FZZongYi-M05;
              font-weight: bold;
              color: #4c4c4c;
            }

            &-bd {
              padding-top: 10px;
              font-size: 18px;
              font-family: Source Han Sans CN;
            }
          }

          // flexbox
          .@{css-prefix}page-section-flexbox-align-end {
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            text-align: left;
            overflow-y: hidden;
          }
        }
      }
    }
  }

  .down {
    position: absolute;
    left: 50%;
    bottom: 30%;
    width: 24px;
    height: 29px;
    transform: translate3d(-50%, 0, 0);
    background: url('../../assets/images/user/page-arrow.png') center no-repeat;
    background-size: 100% 100%;
  }

  // 封装的动画效果
  .keyframesFunction (@name,@content) {
    @keyframes @name {
      @content();
    }
  }

  //引用时写进所需要的css样式中
  .down {
    .keyframesFunction (down, {0% {bottom: 30px;} 100% {bottom: 10px;}});
    animation: down 1s infinite;
  }

  // 首页
  .pagehome {
    background-image: url('../../assets/images/user/pagehome-bg.png');
    background-repeat: no-repeat;
    background-size: cover;

    .img1 {
      padding-top: 50px;
      padding-left: 15px;

      > img {
        display: block;
        width: 285px;
        height: auto;
      }
    }

    .img2 {
      padding-top: 10px;
      padding-left: 31px;

      > img {
        display: block;
        width: 256px;
        height: auto;
      }
    }
  }

  // 第一页
  .page1 {
    background-image: url('../../assets/images/user/page1-bg.png');
    background-repeat: no-repeat;
    background-size: cover;

    .@{css-prefix}page-section1 {
      padding-top: 40px;
    }

    .@{css-prefix}page-section5 {
      padding-top: 30px;
      padding-left: 25px;

      .@{css-prefix}page-section5-title {
        font-size: 36px;
        font-family: FZZongYi-M05;
        font-weight: bold;
        line-height: 1;
        color: #4c4c4c;
      }

      .@{css-prefix}page-section5-application {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 70%;
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 1;
        color: #4c4c4c;

        > div {
          width: 50%;
          padding-top: 15px;
        }
      }
    }
  }

  // 第二页
  .page2 {
    background-image: url('../../assets/images/user/page1-bg.png');
    background-repeat: no-repeat;
    background-size: cover;

    .@{css-prefix}page2-wrapper {
      text-align: left;
    }

    .@{css-prefix}page2-section1 {
      padding-top: 10%;
      padding-left: 25px;

      &-title {
        font-size: 22px;
        font-family: FZZongYi-M05;
        font-weight: bold;
        line-height: 1;
        color: #4c4c4c;
      }

      &-content {
        &-item {
          padding-top: 3%;
          font-size: 18px;
          font-weight: 400;
          color: #4c4c4c;
          line-height: 1;

          .fs28 {
            font-size: 28px;
          }

          > div {
            padding-top: 3%;

            &:first-of-type {
              font-size: 28px;
              color: #c31313;
            }
          }
        }
      }
    }

    .@{css-prefix}page2-section5 {
      padding-top: 6%;
      padding-left: 25px;

      .@{css-prefix}page2-section5-title {
        font-size: 28px;
        font-family: FZZongYi-M05;
        font-weight: bold;
        line-height: 1;
        color: #4c4c4c;
      }

      .@{css-prefix}page2-section5-top {
        padding-top: 10px;
        font-size: 24px;
        font-family: FZZongYi-M05;
        font-weight: bold;
        line-height: 1;
        color: #c31313;
      }

      .@{css-prefix}page2-section5-application {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        flex-wrap: wrap;
        font-size: 16px;
        font-family: FZZongYi-M05;
        font-weight: bold;
        line-height: 1;
        color: #4c4c4c;

        > div {
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          width: 50%;
          padding-top: 15px;
          padding-right: 15px;

          > div {
            &:first-of-type {
              width: 100px;
            }

            &:last-of-type {
              flex: 1;
              font-family: Source Han Sans CN;
              font-weight: bold;
              color: #cf953d;
              text-align: right;
            }
          }
        }
      }
    }
  }

  // 第三页
  .page3 {
    background-image: url('../../assets/images/user/page3-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  // 第四页
  .page4 {
    background-image: url('../../assets/images/user/page1-bg.png');
    background-repeat: no-repeat;
    background-size: cover;

    .@{css-prefix}page-section1 {
      padding-top: 20px;

      &-content {
        &-item {
          padding-top: 15px;
        }
      }
    }
  }

  // 第五页
  .page5 {
    background-image: url('../../assets/images/user/page3-bg.png');
    background-repeat: no-repeat;
    background-size: cover;

    .@{css-prefix}page-section1 {
      padding-top: 20px;

      &-content {
        &-item {
          padding-top: 60px;
        }
      }
    }
  }

  // 第六页
  .page6 {
    background-image: url('../../assets/images/user/page1-bg.png');
    background-repeat: no-repeat;
    background-size: cover;

    .img1 {
      width: 100%;
      padding-top: 80px;
      text-align: center;

      > img {
        display: inline-block;
        width: 316px;
        height: auto;
      }
    }

    .img2 {
      width: 100%;
      padding-top: 30px;
      text-align: center;

      > img {
        display: inline-block;
        width: 273px;
        height: auto;
      }
    }

    .@{css-prefix}btns {
      position: absolute;
      left: 0;
      bottom: 40px;
      width: 100%;
      height: 50px;
      line-height: 1;
      text-align: center;
    }

    .@{css-prefix}btn {
      display: inline-block;
      height: 50px;
      padding: 0 25px;
      line-height: 50px;
      font-size: 18px;
      background-color: #ffffff;
      border: 1px solid #ebc676;
      border-radius: 5px;
      color: #ebc676;

      &.@{css-prefix}btn-primary {
        color: #ffffff;
        background-color: #ebc676;
      }
    }
  }

  .animate__animated.animate__delay-0-5s {
    animation-delay: 0.5s;
  }

  .animate__animated.animate__delay-1-5s {
    animation-delay: 1.5s;
  }
</style>
