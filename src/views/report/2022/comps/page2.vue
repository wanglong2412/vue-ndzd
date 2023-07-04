<template>
  <div class="slide-page page2">
    <tip :current="current"
         :sort="sort"
         :statusbar-height="statusbarHeight"></tip>
    <div class="cyui-page-wrapper cyui-page2-section1"
         :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 80) * 2
                        )}rem`
                      }
                    }">
      <transition enter-active-class="animate__animated animate__bounceInDown animate__normals"
                  leave-active-class="animate__animated animate__fadeOut animate__faster">
        <div v-if="`${current}` === `${sort}`">
          <div class="cyui-page2-section-margin">
            <div class="cyui-page2-section1-txt2">这是你在江南的第<span>12</span>年</div>
            <div class="cyui-page2-section1-txt2">我们一起走过了<span>4380</span>个日出日落</div>
          </div>
          <div class="cyui-page2-section-margin">
            <div class="cyui-page2-section1-txt2">2022年</div>
            <div class="cyui-page2-section1-txt2">累计为江南付出<span>128960</span>时长</div>
          </div>
        </div>

      </transition>
      <transition enter-active-class="animate__animated animate__bounceInUp animate__normal animate__delay-0-5s"
                  leave-active-class="animate__animated animate__fadeOut animate__faster">
        <div v-if="`${current}` === `${sort}`">
          <div class="cyui-page2-section-margin">
            <div class="cyui-page2-section1-txt2">你这一年有<span>70%</span>的时间始终在自己的岗位发光发热</div>
          </div>
          <div class="cyui-page2-section-margin">
            <div class="cyui-page2-section1-txt2"><span style="margin-left: 0">12</span>月<span>25</span>日那天你下班最晚，那晚的你一定不孤单，因为漫天的星光都在陪伴你</div>
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
  import Tip from './tip.vue'
  export default {
    name: 'Page2',
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

  // 第二页
  .page2 {
    background-image: url('~@assets/images/report/2022/page2-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;

    .@{css-prefix}page2-section1 {
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
          color: #0a5180;
          letter-spacing: 2px;
          margin: 0 4px;
        }
      }
    }
    .@{css-prefix}page2-section-margin{
      margin-bottom: 15px;
    }
  }
</style>
