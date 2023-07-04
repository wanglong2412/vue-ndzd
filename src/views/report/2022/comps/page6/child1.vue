<template>
  <div class="slide-page page6Son1">
    <div class="cyui-page-wrapper cyui-page6-section2"
         :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 80) * 2
                        )}rem`
                      }
                    }">
      <transition enter-active-class="animate__animated animate__bounceIn animate__normal"
                  leave-active-class="animate__animated animate__zoomOut animate__faster">
        <div class="cyui-page6-section-margin"
             v-if="`${current}` === `${sort}`">
          <div class="cyui-page6-section2-txt2">亲爱的XXX，你好呀～</div>
          <div class="cyui-page6-section2-txt2">还记得XX月XX日那天吗</div>
          <div class="cyui-page6-section2-txt2">那是你发布文章的第一天</div>
        </div>
      </transition>

    </div>
    <bottom-comp :name="`日志子账单`"
                 :current="current"
                 :sort="sort"
                 v-on:jumpNext="jumpNext"></bottom-comp>
    <div class="up"
         @click="goNext"></div>
  </div>
</template>

<script>
  import common from '@mixins/common'
  import { formatPx2Rem } from '@utils/index'
  import BottomComp from '../bottom.vue'
  export default {
    name: 'page6Child1',
    mixins: [common],
    components: { BottomComp },
    data() {
      return {
        current: null,
        currentSon: null
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

  // 日志子页面1
  .page6Son1 {
    background-image: url('~@assets/images/report/2022/page6-child1-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
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
    .@{css-prefix}page6-section-margin{
      margin-bottom: 15px;
    }
  }
</style>
