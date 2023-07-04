<template>
  <div class="slide-page page7Son2">
    <div class="cyui-page-wrapper cyui-page7-section2"
         :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 80) * 2
                        )}rem`
                      }
                    }">
      <transition enter-active-class="animate__animated animate__bounceIn animate__normal"
                  leave-active-class="animate__animated animate__zoomOut animate__faster">
        <div class="cyui-page7-section-margin"
             v-if="`${current}` === `${sort}`">
          <div class="cyui-page7-section2-txt2">阳光贷新增用信体验户数<span>12</span>个</div>
          <div class="cyui-page7-section2-txt2">新增用信余额<span>30万</span>元</div>
          <div class="cyui-page7-section2-txt2">日均用信余额<span>1024</span>元</div>
        </div>
      </transition>

    </div>
    <bottom-comp :name="`营销子账单`"
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
    name: 'page7Child2',
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
        this.$emit('goPage', 'page8', 0)
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

  // 营销子页面2
  .page7Son2 {
    background-image: url('~@assets/images/report/2022/page7-child1-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    .@{css-prefix}page7-section2 {
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
    .@{css-prefix}page7-section-margin{
      margin-bottom: 15px;
    }
  }
</style>
