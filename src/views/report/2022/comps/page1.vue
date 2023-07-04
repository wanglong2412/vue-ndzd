<template>
  <div class="slide-page page1">
    <tip :current="current"
         :sort="sort"
         :statusbar-height="statusbarHeight"></tip>
    <div class="cyui-page-wrapper cyui-page1-section1"
         :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 50) * 2
                        )}rem`
                      }
                    }">
      <transition enter-active-class="animate__animated animate__lightSpeedInLeft animate__normals"
                  leave-active-class="animate__animated animate__lightSpeedOutLeft animate__faster">
        <div v-if="`${current}` === `${sort}`">
          <div class="cyui-page1-section1-name">李晓春</div>
          <div class="cyui-page1-section1-txt1">初遇，幸会</div>
        </div>
      </transition>
      <transition enter-active-class="animate__animated animate__lightSpeedInRight animate__normal animate__delay-1s"
                  leave-active-class="animate__animated animate__lightSpeedOutRight animate__faster">
        <div v-if="`${current}` === `${sort}`">
          <div class="cyui-page1-section1-date"><span>2020</span>年<span>12</span>月<span>25</span>日</div>
          <div class="cyui-page1-section1-txt2">是你入职江南的第一天</div>
          <div class="cyui-page1-section1-txt2">和你同一天入职的有<span>3</span>人</div>
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
    name: 'Page1',
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
  // @import '~@assets/styles/mixins/index';
  @import '~@assets/styles/mixins/page';

  @profilePrefixCls: ~'@{css-prefix}profile';

  // 第一页
  .page1 {
    background-image: url('~@assets/images/report/2022/page1-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;

    .@{css-prefix}page1-section1 {
      &-name {
        padding-left: 28px;
        font-size: 27px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: 800;
        color: #0a5180;
        letter-spacing: 5px;
        position: relative;
      }
      &-name::before {
        position: absolute;
        content: ' ';
        width: 28px;
        height: 4px;
        background: #0a5180;
        left: 28px;
        bottom: -6px;
      }
      &-txt1 {
        padding-left: 28px;
        padding-top: 20px;
        font-size: 20px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: 400;
        color: #000000;
        letter-spacing: 3px;
      }
      &-date {
        padding-left: 17px;
        padding-top: 25px;
        font-size: 18px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: 400;
        color: #000000;
        letter-spacing: 2px;
        display: flex;
        align-items: center;
        span {
          font-size: 27px;
          font-family: Impact;
          font-weight: 600;
          color: #0a5180;
          letter-spacing: 2px;
          margin: 0 11px;
        }
      }
      &-txt2 {
        padding-left: 28px;
        padding-top: 2px;
        font-size: 18px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 38px;
        letter-spacing: 4px;
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
  }
</style>
