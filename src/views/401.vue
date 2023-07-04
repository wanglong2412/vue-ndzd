<template>
  <div class="cyui-layout-wrapper">
    <cyui-layout>
      <template #header>
        <cyui-header v-if="isCustomHeader"
                     :title="headerTitle"
                     @go-back="goBack"
                     @on-close="handleClosePage">
          <template #headerRight>
            <div></div>
          </template>
        </cyui-header>
      </template>
      <template #default>
        <div class="cyui-prompt">
          <div class="cyui-prompt-header">
            <div class="cyui-prompt-pic">
              <!--<svg-icon icon-class="prompt_401"></svg-icon>-->
              <img v-lazy="prompt401">
            </div>
          </div>
          <div class="cyui-prompt-body">
            <div class="cyui-prompt-message">
              <p class="cyui-prompt-message-title">抱歉，您暂无权限</p>
              <!--<p>请联系业务负责人开通权限</p>-->
            </div>
            <div class="cyui-prompt-button">
              <a class="cyui-btn cyui-btn-inline cyui-btn-ghost" :href="`tel:${serviceTel}`">立即开通</a>
            </div>
          </div>
        </div>
      </template>
    </cyui-layout>
  </div>
</template>

<script>
  import common from '@mixins/common'
  import prompt401 from '@assets/images/401/img_001.png'

  export default {
    name: 'Page401',
    mixins: [common],
    components: {},
    data() {
      return {
        headerTitle: '',
        serviceTel: '0519-81582577',
        origin: '',
        prompt401
      }
    },
    props: {},
    computed: {},
    methods: {
      // goBack() { // 页面回退
      //   console.log('返回首页')
      // },
      goHome() {
        this.$router.replace({
          path: '/'
        })
      },
      async initData() {
      }
    },
    filters: {},
    watch: {},
    created() {
    },
    mounted() {
      this.initData()
    },
    beforeRouteEnter(to, from, next) {
      // console.log(to)
      // console.log(from)
      next()
    },
    beforeRouteUpdate(to, from, next) {
      // console.log(to)
      // console.log(from)
      next()
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/styles/themes/default/index';
  @import '../assets/styles/mixins/index';

  @promptPrefixCls: ~'@{css-prefix}prompt';

  .@{css-prefix}layout-wrapper {
    height: 100%;
    background-color: #FBFBFB;
  }

  .@{promptPrefixCls} {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate3d(-50%, -50%, 0);
    text-align: center;

    &-header {
      .@{promptPrefixCls}-pic {

        > img {
          display: block;
          width: 375px;
          height: 155px;
          margin: 0 auto;
        }

        .svg-icon {
          display: block;
          width: 375px;
          height: 375px;
          margin: 0 auto;
        }
      }
    }

    &-body {
      position: relative;
      top: 10px;
      z-index: 2;

      .@{promptPrefixCls}-message {
        padding: 20px 0 0 0;
        line-height: 24px;
        color: #999999;
        font-size: 14px;

        p {
          margin-bottom: 5px;

          > span {
            margin-left: 15px;
          }

          &:last-of-type {
            margin-bottom: 0;
          }

          &.@{promptPrefixCls}-message-title {
            margin-bottom: 0;
            font-size: 18px;
            color: #333333;
          }

          &.@{promptPrefixCls}-message-contact {
            font-size: 16px;
            color: #666666;
          }
        }

        em {
          color: @brand-primary;
          text-decoration: underline;
        }
      }

      .@{promptPrefixCls}-button {
        padding: 30px 20px 0;

        .@{css-prefix}btn {
          height: 44px;
          line-height: 44px;
          color: #C3A475;
          font-size: 15px;
          padding: 0 40px;
          border-color: #C3A475;
          border-radius: 22px;
          background-color: transparent;
        }
      }
    }
  }
</style>
