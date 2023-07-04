<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content" :style="scrollContentStyle">
      <div>
        <slot></slot>
      </div>
      <slot
        name="pulldown"
        :pullDownRefresh="pullDownRefresh"
        :pullDownRefreshInfo="pullDownRefreshInfo"
        :pullDownStatusLabel="pullDownStatusLabel"
        :pullDownStyle="pullDownStyle"
      >
        <div
          ref="pulldown"
          class="pulldown-wrapper"
          v-if="pullDownRefresh"
          :style="pullDownStyle"
        >
          <div class="pulldown-content">
            <div
              class="pulldown-progress"
              v-show="pullDownRefreshInfo.pullDownStatus !== '4'"
              :class="{
                'loading-rotate': pullDownRefreshInfo.pullDownStatus === '3'
              }"
              :style="pullDownProgressStyle"
            >
              <svg-icon icon-class="spinner"></svg-icon>
            </div>
            <div class="pulldown-tips">{{ pullDownStatusLabel }}</div>
          </div>
        </div>
      </slot>
      <slot
        name="pullup"
        :pullUpLoad="pullUpLoad"
        :pullUpLoadInfo="pullUpLoadInfo"
        :pullUpStatusLabel="pullUpStatusLabel"
      >
        <div ref="pullup" class="pullup-wrapper" v-if="pullUpLoad">
          <div class="pullup-content">
            <div
              class="pullup-progress loading-rotate"
              v-show="pullUpLoadInfo.pullUpStatus === '2'"
            >
              <svg-icon icon-class="spinner"></svg-icon>
            </div>
            <div class="pullup-tips">{{ pullUpStatusLabel }}</div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import NestedScroll from '@better-scroll/nested-scroll'
  import observeDom from '@better-scroll/observe-dom'
  import observeImage from '@better-scroll/observe-image'
  import PullDown from '@better-scroll/pull-down'
  import PullUp from '@better-scroll/pull-up'
  import ScrollBar from '@better-scroll/scroll-bar'
  import { formatPx2Rem } from '@utils'

  BScroll.use(NestedScroll)
  BScroll.use(observeDom)
  BScroll.use(observeImage)
  BScroll.use(PullDown)
  BScroll.use(PullUp)
  BScroll.use(ScrollBar)

  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'

  // 下拉刷新状态
  const pullDownStatusMap = {
    '0': '下拉刷新', // 初始状态
    '1': '下拉刷新', // 移动状态-滚动距离小于阀值
    '2': '释放更新', // 移动状态-滚动距离大于阀值
    '3': '加载中...', // 刷新状态
    '4': '刷新成功' // 成功状态
  }

  // 上拉加载更多状态
  const pullUpStatusMap = {
    '0': '加载更多', // 有更多数据
    '1': '没有更多数据了', // 没有更多数据
    '2': '加载中...' // 加载状态
  }

  export default {
    name: 'Scroller',
    components: {},
    props: {
      startX: {
        // 横轴方向初始化位置
        type: Number,
        default: 0
      },
      startY: {
        // 纵轴方向初始化位置
        type: Number,
        default: 0
      },
      scrollX: {
        // 是否开启横向滚动
        type: Number,
        default: 0
      },
      scrollY: {
        // 是否开启纵向滚动
        type: Number,
        default: 0
      },
      freeScroll: {
        type: Boolean,
        default: false
      },
      click: {
        // BetterScroll 默认会阻止浏览器的原生 click 事件。当设置为 true，BetterScroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
        type: Boolean,
        default: true
      },
      tap: {
        // 因为 BetterScroll 会阻止原生的 click 事件，我们可以设置 tap 为 'tap'，它会在区域被点击的时候派发一个 tap 事件，你可以像监听原生事件那样去监听它。
        type: String,
        default: ''
      },
      bounce: {
        // 滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画。
        type: [Boolean, Object],
        default() {
          return true
        }
      },
      bounceTime: {
        // 设置回弹动画的动画时长。
        type: Number,
        default: 500
      },
      probeType: {
        // 决定是否派发 scroll 事件，对页面的性能有影响，尤其是在 useTransition 为 true 的模式下。
        type: Number,
        default: 1
      },
      preventDefault: {
        // 当事件派发后是否阻止浏览器默认行为。这个值应该设为 true，除非你真的知道你在做什么，通常你可能用到的是 preventDefaultException。
        type: Boolean,
        default: true
      },
      preventDefaultException: {
        type: Object,
        default() {
          return { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/ }
        }
      },
      listenScroll: {
        // 是否监听滚动，开启后才能Emit scroll事件
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        // 是否监听滚动之前，开启后才能Emit beforeScrollStart事件
        type: Boolean,
        default: false
      },
      direction: {
        // 滚动方向
        type: String,
        default: DIRECTION_V
      },
      scrollbar: {
        type: null,
        default: false
      },
      nestedScroll: {
        type: Boolean,
        default: false
      },
      nestedScrollInfo: {
        type: Object,
        default() {
          return {
            groupId: 'vertical-nested-scroll' // groupId is a string or number
          }
        }
      },
      observeDOM: {
        // 开启 observe-dom 插件
        type: null,
        default: false
      },
      observeImage: {
        // 开启 observe-image 插件
        type: null,
        default: true
      },
      pullDownRefresh: {
        // 下拉刷新——参数配置
        type: null,
        default: false
      },
      pullUpLoad: {
        // 上拉加载更多——参数配置
        type: null,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    data() {
      return {
        scroll: null, // scroll实例
        scrollContentStyle: {},
        pullDownRefreshInfo: {
          // 下拉刷新信息
          threshold: 90, // 配置顶部下拉的距离来决定刷新时机
          stop: 40, // 回弹悬停的距离
          stopTime: 500, // 回弹悬停时间
          // downText: '下拉刷新',
          // upText: '释放更新',
          // loadingText: '加载中...',
          // resultText: '刷新成功',
          pullDownStatus: '0', // 下拉刷新状态
          pullDownStatusMap,
          pullDownOffsetY: 0 // 下拉偏移距离
        },
        pullDownStyle: '',
        pullDownProgressStyle: '', // 下拉图标样式
        reboundPullDownTime: null,
        afterPullDownTime: null,
        pullUpLoadInfo: {
          // 上拉加载更多信息
          threshold: 0, // 触发上拉事件的阈值
          // moreText: '加载更多',
          // noMoreText: '没有更多数据了',
          // loadingText: '加载中...',
          pullUpStatus: '0', // 上拉加载更多状态
          pullUpStatusMap
        },
        // isPullUpLoad: false,
        pullUpDirty: true // 此变量用来检查是否加载到了最后一页
      }
    },
    computed: {
      // 下拉刷新状态
      pullDownStatusLabel() {
        let { pullDownStatus, pullDownStatusMap } = this.pullDownRefreshInfo
        return pullDownStatusMap[pullDownStatus]
      },
      // 上拉加载更多状态
      pullUpStatusLabel() {
        let { pullUpStatus, pullUpStatusMap } = this.pullUpLoadInfo
        return pullUpStatusMap[pullUpStatus]
      }
    },
    methods: {
      _resizeHandler() {
        this.$nextTick(() => {
          // this.destroyScroll()
          // this.initData()
          const thisWrapper = this.$refs.wrapper
          thisWrapper.firstElementChild.firstElementChild.style.minHeight =
            thisWrapper.offsetHeight + 'px'
        })
      },
      destroyScroll() {
        // 销毁scroll
        this.scroll && this.scroll.destroy()
        this.scroll = null
        this.reboundPullDownTime && clearTimeout(this.reboundPullDownTime)
        this.reboundPullDownTime = null
        this.afterPullDownTime && clearTimeout(this.afterPullDownTime)
        this.afterPullDownTime = null
      },
      // 获取阀值，临时解决REM
      getPullDownThreshold(threshold) {
        let htmlFontSize = parseFloat(
          document.getElementsByTagName('html')[0].style.fontSize
        ) // 获取当前html的font-size
        let currentThreshold = htmlFontSize * formatPx2Rem(threshold)
        return currentThreshold
      },
      // 重置下拉刷新信息
      async resetPullDownRefreshInfo() {
        let { pullDownRefresh, pullDownRefreshInfo } = this
        if (pullDownRefresh) {
          let newPullDownStatusMap = {
            '0': pullDownRefresh.downText || pullDownStatusMap['0'],
            '1': pullDownRefresh.downText || pullDownStatusMap['1'],
            '2': pullDownRefresh.upText || pullDownStatusMap['2'],
            '3': pullDownRefresh.loadingText || pullDownStatusMap['3'],
            '4': pullDownRefresh.resultText || pullDownStatusMap['4']
          }
          // 重置阀值，临时解决REM
          let threshold =
            pullDownRefresh.threshold || pullDownRefreshInfo.threshold
          threshold = this.getPullDownThreshold(threshold)
          this.pullDownRefreshInfo = {
            ...pullDownRefreshInfo,
            ...pullDownRefresh,
            ...{
              threshold,
              pullDownStatusMap: newPullDownStatusMap
            }
          }
          // console.log(this.pullDownRefreshInfo)
        }
      },
      // 重置上拉加载更多信息
      async resetPullUpLoadInfo() {
        let { pullUpLoad, pullUpLoadInfo } = this
        if (pullUpLoad) {
          let newPullUpStatusMap = {
            '0': pullUpLoad.moreText || pullUpStatusMap['0'],
            '1': pullUpLoad.noMoreText || pullUpStatusMap['1'],
            '2': pullUpLoad.loadingText || pullUpStatusMap['2']
          }
          // 重置阀值，临时解决REM
          let threshold = pullUpLoad.threshold || pullUpLoadInfo.threshold
          threshold = this.getPullDownThreshold(threshold)
          this.pullUpLoadInfo = {
            ...pullUpLoadInfo,
            ...pullUpLoad,
            ...{
              threshold,
              pullUpStatusMap: newPullUpStatusMap
            }
          }
          // console.log(this.pullUpLoadInfo)
        }
      },
      // 判断当content高度是否小于wrapper
      async resetContentHeight() {
        if (this.scroll) {
          let scrollerHeight = this.scroll.scrollerHeight
          let wrapperHeight = this.scroll.wrapper.clientHeight
          if (scrollerHeight <= wrapperHeight) {
            this.resetContentStyle = { minHeight: `${wrapperHeight + 1}px` }
            this.refresh()
          }
        }
      },
      initScroll() {
        if (!this.$refs.wrapper) {
          return
        }

        let options = {
          startX: this.startX,
          startY: this.startY,
          scrollY: this.freeScroll || this.direction === DIRECTION_V,
          scrollX: this.freeScroll || this.direction === DIRECTION_H,
          freeScroll: this.freeScroll,
          click: this.click,
          tap: this.tap,
          bounce: this.bounce,
          bounceTime: this.bounceTime,
          probeType: this.probeType,
          preventDefault: this.preventDefault,
          preventDefaultException: this.preventDefaultException,
          scrollbar: this.scrollbar,
          observeDOM: this.observeDOM, // 开启 observe-dom 插件
          observeImage: this.observeImage, // 开启 observe-image 插件
          pullDownRefresh: this.pullDownRefresh
            ? this.pullDownRefreshInfo
            : this.pullDownRefresh, // 下拉刷新
          pullUpLoad: this.pullUpLoad // 上拉加载更多
        }

        // 是否需要嵌套滚动
        if (this.nestedScroll) {
          options = {
            ...options,
            ...{
              nestedScroll: this.nestedScrollInfo
            }
          }
        }

        this.scroll = new BScroll(this.$refs.wrapper, options)

        this.resetContentHeight()

        this.scroll.on('refresh', () => {
          this.$emit('refresh')
        })
        this.scroll.on('enable', () => {
          this.$emit('enable')
        })
        this.scroll.on('disable', () => {
          this.$emit('disable')
        })
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })
        this.scroll.on('scrollStart', () => {
          this.$emit('scrollStart')
        })
        this.scroll.on('scroll', position => {
          let { pullDownRefresh, pullDownRefreshInfo } = this
          if (pullDownRefresh) {
            // 支持下拉刷新，对效果特殊处理
            let { pullDownStatus } = pullDownRefreshInfo
            this.pullDownRefreshInfo.pullDownOffsetY = position.y
            // 移动状态
            if (pullDownStatus === '1' || pullDownStatus === '2') {
              this.pullDownProgressStyle = `transform: rotate(${position.y *
              5}deg)`
              this.pullDownStyle = `top:0px`
            }
          }
          this.$emit('scroll', {
            position,
            pullDownRefresh,
            pullDownRefreshInfo
          })
        })
        this.scroll.on('scrollEnd', () => {
          this.$emit('scrollEnd')
        })
        this.scroll.on('scrollCancel', () => {
          this.$emit('scrollCancel')
        })
        this.scroll.on('touchEnd', () => {
          this.$emit('touchEnd')
        })
        this.scroll.on('flick', () => {
          this.$emit('flick')
        })
        this.scroll.on('destroy', () => {
          this.$emit('destroy')
        })
        this.scroll.on('contentChanged', newContent => {
          this.$emit('contentChanged', newContent)
        })
        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }
        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo(x, y, time, easing, extraTransform) {
        this.scroll && this.scroll.scrollTo(x, y, time, easing, extraTransform)
      },
      scrollBy(x, y, time, easing) {
        this.scroll && this.scroll.scrollBy(x, y, time, easing)
      },
      scrollToElement(el, time, offsetX, offsetY, easing) {
        this.scroll &&
        this.scroll.scrollToElement(el, time, offsetX, offsetY, easing)
      },
      stop() {
        this.scroll && this.scroll.stop()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      destroy() {
        this.scroll && this.scroll.destroy()
      },
      finishPullDown() {
        this.scroll && this.scroll.finishPullDown()
      },
      openPullDown(config) {
        this.scroll && this.scroll.openPullDown(config)
      },
      closePullDown() {
        this.scroll && this.scroll.closePullDown()
      },
      autoPullDownRefresh() {
        this.scroll && this.scroll.autoPullDownRefresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      openPullUp(config) {
        this.scroll && this.scroll.openPullUp(config)
      },
      closePullUp() {
        this.scroll && this.scroll.closePullUp()
      },
      autoPullUpLoad() {
        this.scroll && this.scroll.autoPullUpLoad()
      },
      // 下拉刷新
      _initPullDownRefresh() {
        // 进入刷新状态-进行接口请求
        this.scroll.on('pullingDown', () => {
          let { stop } = this.pullDownRefreshInfo
          this.scrollContentStyle = {
            // 临时解决REM问题
            transform: `translateX(0px) translateY(${formatPx2Rem(
              stop
            )}rem) translateZ(1px)`
          }
          this.pullDownRefreshInfo.pullDownStatus = '3' // 进入刷新状态
          this.$emit('pullingDown', this.pullDownRefreshInfo)
        })
        // 进入移动状态-滚动距离小于阀值
        this.scroll.on('enterThreshold', () => {
          this.pullDownRefreshInfo.pullDownStatus = '1' // 下拉刷新
          this.$emit('enterThreshold', this.pullDownRefreshInfo)
        })
        // 进入移动状态-滚动距离大于阀值
        this.scroll.on('leaveThreshold', () => {
          this.pullDownRefreshInfo.pullDownStatus = '2' // 释放更新
          this.$emit('leaveThreshold', this.pullDownRefreshInfo)
        })
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', e => {
          if (this.pullUpDirty) {
            // this.isPullUpLoad = true
            this.pullUpLoadInfo.pullUpStatus = '2' // 加载更多
            this.$emit('pullingUp')
          }
        })
      },
      // 接口请求后回调处理
      forceUpdate(dirty) {
        let { pullDownRefresh, pullUpLoad } = this
        let { pullDownStatus } = this.pullDownRefreshInfo
        // let { pullUpStatus } = this.pullUpLoadInfo

        this.$nextTick(async () => {
          this.pullUpDirty = dirty
          if (pullDownRefresh && pullDownStatus === '3') {
            // 下拉刷新处理-判断是否支持下拉刷新，同时处在刷新状态中
            this.pullDownRefreshInfo.pullDownStatus = '4' // 刷新成功
            await this._reboundPullDown()
            await this._afterPullDown()
            this.refresh()
          } else if (pullUpLoad) {
            // this.isPullUpLoad = false
            if (this.pullUpDirty) {
              this.pullUpLoadInfo.pullUpStatus = '0' // 有更多数据
            } else {
              this.pullUpLoadInfo.pullUpStatus = '1' // 没有更多数据
            }
            this.scroll.finishPullUp()
            this.refresh()
          } else {
            this.refresh()
          }
        })
      },
      // 下拉刷新-准备回弹
      async _reboundPullDown() {
        let { pullDownRefresh, pullUpLoad } = this
        let { stopTime } = this.pullDownRefreshInfo
        return new Promise(resolve => {
          this.reboundPullDownTime = setTimeout(() => {
            if (pullDownRefresh) this.scroll.finishPullDown()
            if (pullUpLoad) this.scroll.finishPullUp()
            resolve()
          }, stopTime)
        })
      },
      // 下拉刷新-结束回调
      async _afterPullDown() {
        let { bounceTime } = this
        return new Promise(resolve => {
          this.afterPullDownTime = setTimeout(() => {
            this.scrollContentStyle = {
              transform: `translateX(0px) translateY(0px) translateZ(0px)`
            }
            this.pullDownStyle = `top:0px`
            resolve()
          }, bounceTime)
        })
      },
      async initData() {
        this.resetPullDownRefreshInfo()
        await this.resetPullUpLoadInfo()
        await this.initScroll()
      }
    },
    created() {},
    beforeMount() {
      window.addEventListener('resize', this._resizeHandler)
    },
    mounted() {
      const thisWrapper = this.$refs.wrapper
      thisWrapper.firstElementChild.firstElementChild.style.minHeight =
        thisWrapper.offsetHeight + 'px'
      this.$nextTick(() => {
        this.initData()
      })
    },
    beforeDestroy() {
      window.removeEventListener('resize', this._resizeHandler)
    },
    destroyed() {
      this.destroyScroll()
    }
  }
</script>

<style lang="less" scoped>
  .scroll-wrapper {
    height: 100%;
    overflow: hidden;
  }

  .scroll-loading {
    width: 20px;
    height: 20px;
  }

  .pulldown-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    padding: 0 20px;
    text-align: center;
    color: #999;
    box-sizing: border-box;
    transform: translateY(-100%) translateZ(0);
  }

  .before-trigger,
  .after-trigger {
    height: 100%;
  }

  .pulldown-content,
  .pullup-content {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .pulldown-progress,
    .pullup-progress {
      display: block;
      margin-right: 5px;
      height: 18px;
      width: 18px;
      // border-radius: 100%;
      // border: 1px solid #3183ff;
      // border-bottom-color: transparent;
      // background: transparent;
      animation-fill-mode: both;

      .svg-icon {
        display: block;
        fill: #a67342;
        vertical-align: middle;
        width: 100%;
        height: 100%;
      }
    }

    .pulldown-tips,
    .pullup-tips {
      display: block;
      font-size: 14px;
      color: #999999;
    }
  }

  .pullup-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }

  .loading-rotate {
    animation: rotate 0.75s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg) scale(1) translateZ(0);
    }

    100% {
      transform: rotate(360deg) scale(1) translateZ(0);
    }
  }
</style>
