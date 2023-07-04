<template>
  <header class="cyui-header">
    <div class="cyui-header-left">
      <slot name="headerLeft">
        <!--<span class="left-arrow" @click="goBack"></span>-->
        <div class="left-arrow-img" @click="goBack">
          <img src="../../../assets/images/back.png" alt="">
        </div>
      </slot>
    </div>
    <div class="cyui-header-title">
      <slot name="headerTitle">{{title}}</slot>
    </div>
    <div class="cyui-header-right">
      <slot name="headerRight">
        <div class="cyui-header-btn cyui-header-btn-close" @click="handleClosePage">
          <div class="cyui-header-btn-svg">
            <svg-icon icon-class="close"></svg-icon>
          </div>
        </div>
      </slot>
    </div>
  </header>
</template>

<script>
  import { appTitle } from '@config/config'

  export default {
    name: 'Header',
    mixins: [],
    components: {},
    data() {
      return {}
    },
    props: {
      title: {
        type: String,
        default: appTitle
      }
    },
    computed: {},
    methods: {
      goBack() { // 回退
        this.$emit('go-back')
      },
      handleClosePage() { // 关闭页面
        this.$emit('on-close')
      },
      async initData() {
      }
    },
    watch: {},
    created() {
      this.initData()
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/themes/default/index';
  @import '../../../assets/styles/mixins/index';

  @headerPrefixCls: ~'@{css-prefix}header';

  .@{headerPrefixCls} {

    & &-btn {
      &.@{headerPrefixCls}-btn-horizontal {
        .@{headerPrefixCls}-btn-icon {
          .svg-icon {
            display: block;
            width: 16px;
            height: 16px;
            line-height: 1;
            fill: #CDA66E;
          }
        }

        .@{headerPrefixCls}-btn-icon + .@{headerPrefixCls}-btn-label {
          margin-left: 5px;
        }
      }

      .@{headerPrefixCls}-btn-svg {
        display: block;
        width: 22px;
        height: 22px;
        line-height: 22px;

        .svg-icon {
          display: inline-block;
          width: 22px;
          height: 22px;
          fill: #aba9ab;
        }
      }

      &.@{headerPrefixCls}-btn-close {
        .@{headerPrefixCls}-btn-svg {
          display: block;
          width: 35px;
          height: 25px;
          line-height: 25px;
          border: 1px solid #aba9ab;
          border-radius: 22.5px;
          box-sizing: border-box;

          .svg-icon {
            width: 15px;
            height: 15px;
          }
        }
      }
    }

    & &-left {
      .left-arrow-img {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        margin-left: -15px;
        padding-left: 8px;

        > img {
          display: block;
          width: 24px;
          height: 24px;
        }
      }
    }

    & &-right {
    }

    & &-title {
      font-size: 18px;
      font-weight: 700;
      color: #333333;
    }
  }
</style>
