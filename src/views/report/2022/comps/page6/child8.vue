<template>
  <div class="slide-page page6Son8">
    <div class="cyui-page-wrapper cyui-page6-section2"
         :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 60) * 2
                        )}rem`
                      }
                    }">
      <transition enter-active-class="animate__animated animate__fadeInDown animate__normal"
                  leave-active-class="animate__animated animate__zoomOut animate__faster">
        <div class="cyui-page-title"
             v-if="`${current}` === `${sort}`">我的年度关键词</div>
      </transition>
      <transition enter-active-class="animate__animated animate__fadeIn animate__normal"
                  leave-active-class="animate__animated animate__zoomOut animate__faster">
        <img v-if="`${current}` === `${sort}`"
             class="cyui-page-keyword"
             :src="require(`@assets/images/report/2022/page6-child8-keyword${current_key}.png`)" />
      </transition>
      <transition enter-active-class="animate__animated animate__fadeIn animate__normal"
                  leave-active-class="animate__animated animate__zoomOut animate__faster">
        <img v-if="`${current}` === `${sort}`"
             class="cyui-page-content"
             :src="require(`@assets/images/report/2022/page6-child8-cont${current_key}.png`)" />
      </transition>

    </div>
    <div class="cyui-bottom">
      <div class="cyui-bottom-left">
        <transition enter-active-class="animate__animated animate__fadeIn animate__normal"
                    leave-active-class="animate__animated animate__fadeOut animate__faster">
          <div class="name"
               v-if="`${current}` === `${sort}`">李晓春的日志子账单</div>
        </transition>
        <transition enter-active-class="animate__animated animate__fadeInLeft animate__normal animate__delay-0-5s"
                    leave-active-class="animate__animated animate__fadeOutLeft animate__faster">
          <div class="line"
               v-if="`${current}` === `${sort}`"></div>
        </transition>
      </div>
      <transition enter-active-class="animate__animated animate__fadeInRight animate__normal"
                  leave-active-class="animate__animated animate__fadeOutRight animate__faster">

        <div class="cyui-bottom-right"
             v-if="`${current}` === `${sort}`"
             @click="jumpNext">
          <div class="btn-img"></div>
          <div class="btn-text">
            <div>立即扫码</div>
            <div>开启你的日志账单</div>
          </div>
        </div>
      </transition>
    </div>
    <div class="up"
         @click="goNext"></div>
  </div>
</template>

<script>
  import common from '@mixins/common'
  import { formatPx2Rem } from '@utils/index'
  export default {
    name: 'page6Child8',
    mixins: [common],
    components: {},
    data() {
      return {
        current: null,
        currentSon: null,
        current_key: parseInt(Math.random() * (6 - 0 + 1) + 0) //0努力 1知足 2攀越 3坚持 4执行力 5探索 6勤奋
      }
    },
    props: {
      statusbarHeight: {
        type: String,
        require: true,
        default: '0'
      },
      currentPageIndex: {
        type: Number,
        require: true,
        default: 0
      },
      currentSonIndex: {
        type: Number,
        require: true,
        default: 0
      },
      sort: {
        type: Number,
        require: true,
        default: 0
      },
      indicator: {
        type: Number,
        require: true,
        default: 0
      }
    },
    computed: {},
    methods: {
      formatPx2Rem,
      goNext() {
        this.$emit('goNextPage')
      },
      jumpNext() {
        this.$emit('goPage', 'page7', 0)
      },
      solveIndicatorCurrent() {
        this.$emit('solveIndicatorCurrent', this.indicator)
      }
    },
    watch: {
      currentPageIndex: {
        handler: function (newVal, oldVal) {
          setTimeout(() => {
            this.current = newVal
            if (this.current == this.sort) this.solveIndicatorCurrent()
          })
        },
        immediate: true
      },
      currentSonIndex: {
        handler: function (newVal, oldVal) {
          setTimeout(() => {
            this.currentSon = newVal
          })
        },
        immediate: true
      }
    },
    created() {
      this.currentSon = null
    },
    mounted() {}
  }
</script>

<style lang="less" scoped>
  @import '~@assets/styles/themes/default/index';
  @import '~@assets/styles/mixins/index';
  @import '~@assets/styles/mixins/page';

  @profilePrefixCls: ~'@{css-prefix}profile';

  // 日志子页面8
  .page6Son8 {
    background-image: url('~@assets/images/report/2022/page6-child8-bg1.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;

    .@{css-prefix}page6-section2 {
      &-txt2 {
        padding-left: 28px;
        font-size: 18px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: 400;
        color: #000000;
        letter-spacing: 4px;
        line-height: 42px;
        span {
          font-size: 27px;
          font-family: Impact;
          font-weight: 600;
          color: #305CC1;
          letter-spacing: 2px;
          margin: 0 3px;
        }
        .link{
          font-weight: 600;
          font-size: 18px;
          font-family: PingFang SC-Bold, PingFang SC;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 2px;
        }
      }
    }
    .@{css-prefix}page-title{
        font-size: 18px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: 600;
        color: #000000;
        margin-left: 24px;
        letter-spacing: 2px;
    }
    .@{css-prefix}page-keyword{
      height: 110px;
      margin-left: 34px;
      margin-top: 60px;
    }
    .@{css-prefix}page-content{
      width: 86%;
      margin-left: 34px;
      margin-top: 32px;
    }
    .@{css-prefix}page6-section-margin{
      margin-bottom: 15px;
    }
    .@{css-prefix}bottom{
      position: absolute;
      bottom: 0;
      left: 24px;
      right: 14px;
      display: flex;
      &-left{
        margin-bottom: 30px;
        .name{
          text-align: left;
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #000000;
          line-height: 34px;
        }
        .line{
          width: 23px;
          height: 3px;
          background: #000;
        }
      }
      &-right{
        position: absolute;
        right: 0;
        bottom: 8px;
        .btn-img{
          width: 65px;
          height: 65px;
          background: url('~@assets/images/report/2022/qrcode.png') center no-repeat;
          background-size: 100% 100%;
          display: inline-block;
        }
        .btn-text{
          font-size: 12px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #000000;
          line-height: 16px;
        }
      }
    }
  }
</style>
