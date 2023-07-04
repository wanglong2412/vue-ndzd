<template>
  <div class="slide-page page5Son2">
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
        <div class="cyui-page5-list"
             v-if="`${current}` === `${sort}`">
          <div class="cyui-page5-list-title">常用的功能有</div>

          <div class="cyui-page5-list-item">待办事项</div>
          <div class="cyui-page5-list-item">需求中心</div>
          <div class="cyui-page5-list-item">定价审批</div>
          <div class="cyui-page5-list-item">信贷大集中</div>
          <div class="cyui-page5-list-item">企业年金</div>
          <div class="cyui-page5-list-item">一起富阳光贷</div>
          <div class="cyui-page5-list-item">党建新闻</div>
          <div class="cyui-page5-list-item">智慧党建</div>
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
    name: 'page5Child2',
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

  // 智慧江南子页面2
  .page5Son2 {
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

    .@{css-prefix}page5-list{
      padding: 0 26px;
      &-title{
        font-size: 18px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: 400;
        color: #000000;
        letter-spacing: 2px;
        text-align: center;
        margin-bottom: 15px;
      }
      &-item{
        width: 50%;
        float: left;
        font-size: 18px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 38px;
        text-align: center;
      }
    }
  }
</style>
