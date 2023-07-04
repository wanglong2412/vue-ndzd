<template>
  <div class="cyui-prompt">
    <div class="cyui-prompt-header">
      <div class="cyui-prompt-pic">
        <slot name="icon">
          <svg-icon :icon-class="icon" v-if="showIcon"></svg-icon>
        </slot>
      </div>
    </div>
    <div class="cyui-prompt-body">
      <div class="cyui-prompt-message">
        <slot name="title">
          <p class="cyui-prompt-message-title" v-if="showTitle">{{title}}</p>
        </slot>
        <slot name="text">
          <p v-if="showMsg">{{msg}}</p>
        </slot>
      </div>
      <div class="cyui-prompt-button">
        <slot name="btn"></slot>
        <!--<a class="cyui-btn cyui-btn-inline cyui-btn-ghost" :href="`tel:${serviceTel}`">立即开通</a>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoData',
    props: {
      icon: {
        type: String,
        default: 'prompt_nodata'
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      showTitle: {
        type: Boolean,
        default: false
      },
      msg: {
        type: String,
        default: '暂无数据哦~'
      },
      showMsg: {
        type: Boolean,
        default: true
      }
    },
    computed: {}
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/themes/default/index';
  @import '../../assets/styles/mixins/index';

  @promptPrefixCls: ~'@{css-prefix}prompt';

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
          width: 80%;
          margin: 0 auto;
        }

        .svg-icon {
          display: block;
          width: 250px;
          height: 250px;
          margin: 0 auto;
        }
      }
    }

    &-body {
      position: relative;
      top: -50px;
      z-index: 2;

      .@{promptPrefixCls}-message {
        padding: 20px 0 0 0;
        line-height: 24px;
        color: #999999;
        font-size: 16px;

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
