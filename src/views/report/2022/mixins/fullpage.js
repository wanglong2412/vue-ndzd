import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)
let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端

export default {
  data() {
    return {
      fullpageInfo: {
        currentPageIndex: undefined,
        currentSonIndex: undefined
      },
      slide: null,
      indicatorCurrent: 0
    }
  },
  computed: {},
  methods: {
    goNext() {
      if (this.slide) {
        this.slide.next()
      }
    },
    /**
     * 设置指示器选中位置
     */
    solveIndicatorCurrent(indicatorCurrent = 0) {
      this.indicatorCurrent = indicatorCurrent
    },
    async init() {
      // 初始化数据
      this.slide = new BScroll(this.$refs.slide, {
        click: true,
        scrollX: false,
        scrollY: true,
        slide: {
          loop: false, // 是否可以循环。
          threshold: 100, // 切换下一个或上一个 Page 的阈值。
          speed: 800, // 切换 Page 动画的默认时长。
          // easing: ease.bounce // 滚动的缓动效果配置。
          listenFlick: true, // 当快速轻抚过 slide 区域时，会触发切换上一页/下一页。
          autoplay: false, // 是否开启自动播放。
          interval: 3000, // 距离下一次播放的间隔。
          startPageYIndex: 0
        },
        useTransition: !isiOS,
        momentum: false,
        bounce: false,
        preventDefault: true,
        stopPropagation: true
      })
      this.slide.on('scrollEnd', this._onScrollEnd)
    },
    _onScrollEnd() {
      // console.log('scrollEnd')
      let pageIndex = this.slide.getCurrentPage().pageY
      this.fullpageInfo.currentPageIndex = pageIndex
    }
  },
  beforeDestroy() {
    this.slide.destroy()
  }
}
