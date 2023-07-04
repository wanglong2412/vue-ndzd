<template>
  <div class="slide-page page3">
    <tip :current="current"
         :sort="sort"
         :statusbar-height="statusbarHeight"></tip>
    <div class="cyui-page-wrapper cyui-page3-section1"
         :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 80) * 2
                        )}rem`
                      }
                    }">
      <transition enter-active-class="animate__animated animate__lightSpeedInLeft animate__normal"
                  leave-active-class="animate__animated animate__zoomOut animate__faster">
        <div class="cyui-page3-section-margin"
             v-if="`${current}` === `${sort}`">
          <div class="cyui-page3-section1-txt2">2022年总收入<span>156456</span>元</div>
          <div class="cyui-page3-section1-txt2">收到来自江南的员工关怀</div>
          <div class="cyui-page3-section1-txt2">获得积分<span>657</span>分</div>
          <div class="cyui-page3-section1-txt2">获得<span>4380</span>元福利</div>
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
  import Tip from './tip.vue'
  export default {
    name: 'Page3',
    mixins: [common],
    components: { Tip },
    data() {
      return {
        current: null
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
      }
    },
    created() {},
    mounted() {}
  }
</script>

<style lang="less" scoped>
  @import '~@assets/styles/themes/default/index';
  @import '~@assets/styles/mixins/index';
  @import '~@assets/styles/mixins/page';

  @profilePrefixCls: ~'@{css-prefix}profile';

  // 第三页
  .page3 {
    background-image: url('~@assets/images/report/2022/page3-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;

    .@{css-prefix}page3-section1 {
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
          color: #0a5180;
          letter-spacing: 2px;
          margin: 0 3px;
        }
      }
    }
    .@{css-prefix}page3-section-margin{
      margin-bottom: 15px;
    }
  }
</style>
