<template>
  <div class="cyui-bottom">
    <div class="cyui-bottom-left">
      <transition enter-active-class="animate__animated animate__fadeIn animate__normal"
                  leave-active-class="animate__animated animate__fadeOut animate__faster">
        <div class="name"
             v-if="`${current}` === `${sort}`">李晓春的{{name}}</div>
      </transition>
      <transition enter-active-class="animate__animated animate__fadeInLeft animate__normal animate__delay-0-5s"
                  leave-active-class="animate__animated animate__fadeOutLeft animate__faster">
        <div class="line"
             v-if="`${current}` === `${sort}`"></div>
      </transition>
    </div>
    <transition enter-active-class="animate__animated animate__fadeInRight animate__normal"
                leave-active-class="animate__animated animate__fadeOutRight animate__faster">

      <div class="cyui-bottom-right"
           @click="jumpNext"
           v-if="`${current}` === `${sort}`">
        <div class="btn-img"></div>
        <div class="btn-text">跳过{{name}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
  import common from '@mixins/common'
  import { formatPx2Rem } from '@utils/index'
  export default {
    name: 'bottom',
    mixins: [common],
    components: {},
    data() {
      return {}
    },
    props: {
      name: {
        type: String,
        require: true,
        default: '-'
      },
      current: {
        type: Number,
        require: true,
        default: -1
      },
      sort: {
        type: Number,
        require: true,
        default: 0
      }
    },
    computed: {},
    methods: {
      formatPx2Rem,
      jumpNext() {
        this.$emit('jumpNext')
      }
    },
    watch: {},
    created() {},
    mounted() {}
  }
</script>

<style lang="less" scoped>
  @import '~@assets/styles/themes/default/index';
  @import '~@assets/styles/mixins/index';
  @import '~@assets/styles/mixins/page';

  @profilePrefixCls: ~'@{css-prefix}profile';

  .@{css-prefix}bottom{
      position: absolute;
      bottom: 0;
      left: 24px;
      right: 14px;
      display: flex;
      &-left{
        margin-bottom: 30px;
        .name{
          text-align: left;
          font-size: 14px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #000000;
          line-height: 34px;
        }
        .line{
          width: 23px;
          height: 3px;
          background: #000;
        }
      }
      &-right{
        text-align: center;
        position: absolute;
        right: 0;
        bottom: 20px;
        .btn-img{
          width: 18px;
          height: 15px;
          background: url('~@assets/images/report/2022/next.png') center no-repeat;
          background-size: 100% 100%;
          display: inline-block;
        }
        .btn-text{
          font-size: 12px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #000000;
          transform: translate(0,-10px);
        }
      }
    }
</style>
