<template>
  <div class="slide-page page9">
    <transition enter-active-class="animate__animated animate__zoomIn animate__normal"
                leave-active-class="animate__animated animate__fadeOut animate__faster">
      <div v-if="`${current}` === `${sort}`">
        <img :style="{
                    ...{ marginTop: `${formatPx2Rem(
                          (statusbarHeight + 10) * 2
                        )}rem` }
                  }"
             class="page9-cont"
             :src="require(`@assets/images/report/2022/page9-cont${current_key}.png`)" />
        <div class="date"
             :style="{
                    ...{ top: `${formatPx2Rem(
                          (statusbarHeight + 523) * 2
                        )}rem` }
                  }">{{formatDate(new Date(),'yyyy-MM-dd').split('-').join('.')}}</div>
      </div>
    </transition>
    <div class="bottomit">
      <transition enter-active-class="animate__animated animate__slideInLeft animate__normal"
                  leave-active-class="animate__animated animate__fadeOut animate__faster">
        <div class="text"
             v-if="`${current}` === `${sort}`">
          <div>只要热爱</div>
          <div>平凡的岗位上也能做出不平凡的业绩</div>
          <div>平淡的生活中也能活出不平淡的滋味</div>
        </div>
      </transition>
      <transition enter-active-class="animate__animated animate__slideInRight animate__normal"
                  leave-active-class="animate__animated animate__fadeOut animate__faster">
        <div class="scanner"
             v-if="`${current}` === `${sort}`">
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import common from '@mixins/common'
  import { formatPx2Rem, formatDate } from '@utils/index'
  export default {
    name: 'page9',
    mixins: [common],
    components: {},
    data() {
      return {
        current: null,
        current_key: parseInt(Math.random() * (7 - 0 + 1) + 0) //0优秀代表 1率先垂范 2躬先表率 3劳动模范 4爱岗敬业 5积极分子 6忘我工作 7三好员工
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
      formatDate,
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

  // 第九页
  .page9 {
    background-image: url('~@assets/images/report/2022/page9-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;

    .@{css-prefix}page9-section1 {
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
    .@{css-prefix}page9-section-margin{
      margin-bottom: 15px;
    }
  }

  .page9-cont{
    width: calc(100% - 12px);
    margin-left: 6px;
  }
  .bottomit{
    width: calc(100% - 44px);
    margin-left: 22px; 
    display: flex;
    .text{
      flex: 1;
      font-size: 14px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #336690;
      line-height: 29px;
    }
    .scanner{
      width: 82px;
      height: 82px;
      background-image: url('~@assets/images/report/2022/qrcode.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .date{
    position: absolute;
    right: 74px;
    font-size: 13px;
    font-family: PingFang SC;
    color: #000000;
  }
</style>
