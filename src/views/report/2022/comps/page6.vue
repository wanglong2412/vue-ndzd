<template>
  <div class="slide-page page6">
    <tip :current="current"
         :sort="sort"
         :statusbar-height="statusbarHeight"></tip>
    <div class="cyui-page-wrapper cyui-page6-section1"
         :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 80) * 2
                        )}rem`
                      }
                    }">
      <transition enter-active-class="animate__animated animate__slideInRight animate__normal"
                  leave-active-class="animate__animated animate__zoomOut animate__faster">
        <div class="cyui-page6-section-margin"
             v-if="`${current}` === `${sort}`">
          <div class="cyui-page6-section1-txt2">2022年您一共发了<span>15</span>篇日志</div>
          <div class="cyui-page6-section1-txt2">总计<span>34576</span>字</div>
          <div class="cyui-page6-section1-txt2">都快赶上了<span>15</span>篇高考作文</div>
          <div class="cyui-page6-section1-txt2"><span class="link"
                  @click="goRizhiPage">打开我的日志账单></span></div>
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
    name: 'Page6',
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
      goRizhiPage() {
        this.$emit('goPage', 'page6Son1', 800)
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

  // 第六页
  .page6 {
    background-image: url('~@assets/images/report/2022/page6-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;

    .@{css-prefix}page6-section1 {
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
    .@{css-prefix}page6-section-margin{
      margin-bottom: 15px;
    }
  }
</style>
