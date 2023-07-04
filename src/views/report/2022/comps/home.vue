<template>
  <div class="slide-page pagehome">
    <transition enter-active-class="animate__animated animate__zoomIn animate__normal"
                leave-active-class="animate__animated animate__zoomOut animate__faster">
      <div class="img1"
           :style="{
                      ...{
                        paddingTop: `${formatPx2Rem(
                          (statusbarHeight + 35) * 2
                        )}rem`
                      }
                    }"
           v-if="`${current}` === `${sort}`">
        <img src="@assets/images/report/2022/pagehome-img1.png"
             alt="" />
      </div>
    </transition>
    <transition enter-active-class="animate__animated animate__jackInTheBox animate__normal animate__delay-0-5s"
                leave-active-class="animate__animated animate__lightSpeedOutLeft animate__faster">
      <div class="img2"
           v-if="`${current}` === `${sort}`">
        <img src="@assets/images/report/2022/pagehome-img2.png"
             alt="" />
      </div>
    </transition>
    <div class="up"
         @click="goNext"></div>
  </div>
</template>

<script>
  import common from '@mixins/common'
  import { formatPx2Rem } from '@utils/index'
  export default {
    name: 'PageHome',
    mixins: [common],
    components: {},
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

  // 首页
  .pagehome {
    background-image: url('~@assets/images/report/2022/pagehome-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    .img1 {
      padding-top: 50px;
      padding-left: 30px;

      > img {
        display: block;
        width: 315px;
        height: auto;
      }
    }

    .img2 {
      padding-left: 55px;
      position: absolute;
      bottom: 100px;
      > img {
        display: block;
        width: 265px;
        height: auto;
      }
    }
  }
</style>
