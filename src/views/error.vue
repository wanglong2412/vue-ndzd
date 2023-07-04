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
              <!--<svg-icon icon-class="prompt_error"></svg-icon>-->
              <img v-lazy="promptError" alt="">
            </div>
          </div>
          <div class="cyui-prompt-body">
            <div class="cyui-prompt-message">
              <p class="cyui-prompt-message-title">请求出错可能原因如下：</p>
              <p>
                系统内部出错；<br>
                技术人员在更新系统过程中；<br>
                链接服务器超时；<br>
                ······
              </p>
              <p class="cyui-prompt-message-contact">
                抱歉给您带来不便，请先检查您手机网络，<br>
                然后<a :href="`tel:${serviceTel}`">{{ isNative ? '联系智慧江南客服' : '数字化管理平台客服'}}</a>处理，谢谢！
              </p>
            </div>
            <div class="cyui-prompt-button cyui-flexbox">
              <div class="cyui-flexbox-item">
                <div class="cyui-btn cyui-btn-gray" @click="goHome">返回应用</div>
              </div>
              <div class="cyui-flexbox-item">
                <div class="cyui-btn cyui-btn-ghost" @click="goBack">稍后重试</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </cyui-layout>
  </div>
</template>

<script>
  import common from '@mixins/common'
  import promptError from '@assets/images/prompt/img_001.png'
  import { isNative } from '@config/config'

  export default {
    name: 'PageError',
    mixins: [common],
    components: {},
    data() {
      return {
        headerTitle: '',
        serviceTel: '0519-81582577',
        origin: '',
        promptError,
        isNative
      }
    },
    props: {},
    computed: {},
    methods: {
      goHome() {
        // this.$router.replace({
        //   path: '/'
        // })
        this.handleClosePage()
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
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;

    &-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1;

      .@{promptPrefixCls}-pic {

        > img {
          display: block;
          width: 100%;
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
      top: 285px;
      z-index: 2;

      .@{promptPrefixCls}-message {
        padding: 20px 0 0 20px;
        line-height: 24px;
        color: #999999;
        font-size: 14px;
        text-align: left;

        p {
          margin-bottom: 5px;

          > span {
            margin-left: 15px;
          }

          &:last-of-type {
            margin-bottom: 0;
          }

          &.@{promptPrefixCls}-message-title {
            margin-bottom: 15px;
            font-size: 20px;
            color: #333333;
          }

          &.@{promptPrefixCls}-message-contact {
            font-size: 16px;
            color: #666666;
          }
        }

        a {
          color: @brand-primary;
        }
      }

      .@{promptPrefixCls}-button {
        padding: 30px 20px 0;
        text-align: left;

        & .@{css-prefix}flexbox-item {
          &:last-of-type {
            padding-left: 20px;
          }

          .@{css-prefix}btn {
            height: 44px;
            line-height: 44px;
            padding: 0 40px;
            background-color: transparent;
            border-color: #C3A475;
            border-radius: 22px;
            color: #C3A475;
            font-size: 15px;

            &-gray {
              border-color: #cccccc;
              color: #cccccc;
            }
          }
        }
      }
    }
  }
</style>
