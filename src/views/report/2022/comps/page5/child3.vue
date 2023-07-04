<template>
  <div class="slide-page page5Son3">
    <div class="cyui-page-wrapper cyui-page5-section2"
         :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 80) * 2
                        )}rem`
                      }
                    }">
      <transition enter-active-class="animate__animated animate__bounceIn animate__normal"
                  leave-active-class="animate__animated animate__zoomOut animate__faster">
        <div v-if="`${current}` === `${sort}`">
          <div class="cyui-page5-section-margin">
            <div class="cyui-page5-section2-txt2">全年日均访问量（总和）&比去年</div>
            <div class="cyui-page5-section2-txt2">上涨百分比<span>43%</span></div>
          </div>
          <div class="cyui-page5-section-margin">
            <div class="cyui-page5-section2-txt2"><span style="margin-left: 0">2020</span>年<span>2</span>月达到峰值</div>
          </div>
          <div class="cyui-page5-section-margin">
            <div class="cyui-page5-section2-txt2">全年日均活跃用户（总和）&比去年</div>
            <div class="cyui-page5-section2-txt2">上涨百分比<span>46%</span></div>
          </div>
        </div>
      </transition>

    </div>
    <!--页脚-->
    <bottom-comp :name="`智慧江南子账单`"
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
    name: 'page5Child3',
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
        this.$emit('goPage', 'page6', 0)
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

  // 智慧江南子页面3
  .page5Son3 {
    background-image: url('~@assets/images/report/2022/page5-child1-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    .@{css-prefix}page5-section2 {
      &-txt2 {
        padding-left: 27px;
        padding-right: 13px;
        font-size: 18px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: 400;
        color: #000000;
        letter-spacing: 3px;
        line-height: 34px;
        span {
          font-size: 27px;
          font-family: Impact;
          font-weight: 600;
          color: #305CC1;;
          letter-spacing: 2px;
          margin: 0 4px;
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

    .@{css-prefix}page5-section-margin{
      margin-bottom: 15px;
    }
  }
</style>
