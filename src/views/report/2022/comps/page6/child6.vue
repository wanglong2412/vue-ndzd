<template>
  <div class="slide-page page6Son6">
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
          <div class="cyui-page6-section2-txt2">集万千宠爱</div>
          <div class="cyui-page6-section2-txt2">你就是TA们的心肝宝贝甜蜜饯儿</div>
          <div class="cyui-page6-section2-txt2">这一年，TA们最常和你互动</div>

          <div class="cyui-page6-section2-person">
            <div class="cyui-page6-section2-person-item">
              <img src="@assets/images/photo1.png" />
              <div class="name">江南小阳</div>
              <div class="dept">科技部</div>
            </div>
            <div class="cyui-page6-section2-person-item">
              <img src="@assets/images/photo2.png" />
              <div class="name">江南小阳</div>
              <div class="dept">科技部</div>
            </div>
            <div class="cyui-page6-section2-person-item">
              <img src="@assets/images/photo1.png" />
              <div class="name">江南小阳</div>
              <div class="dept">科技部</div>
            </div>
          </div>
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
    name: 'page6Child6',
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

  // 日志子页面6
  .page6Son6 {
    background-image: url('~@assets/images/report/2022/page6-child6-bg.jpg');
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
      &-person{
        padding: 0 14px;
        &-item{
          width: calc(100% / 3);
          display: inline-block;
          text-align: center;
          margin-top: 20px;
          img{
            width: 70px;
            height: 70px;
            border-radius: 50%;
            object-fit: cover;
          }
          .name{
            font-size: 18px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: 800;
            color: #00348D;
            letter-spacing: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .dept{
            font-size: 15px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: 400;
            color: #4B6490;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .@{css-prefix}page6-section-margin{
      margin-bottom: 15px;
    }
  }
</style>
