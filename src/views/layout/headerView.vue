<template>
  <header class="cyui-header">
    <div class="cyui-header-left">
      <span class="left-arrow"></span>
    </div>
    <h1 class="cyui-header-title">需求随手记</h1>
    <div class="cyui-header-right">
      <div class="cyui-header-btn">
        <div class="cyui-header-btn-svg">
          <svg-icon icon-class="close"></svg-icon>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'HeaderView',
    mixins: [],
    components: {},
    data () {
      return {}
    },
    props: {},
    computed: {},
    methods: {
      async initData () {
      }
    },
    watch: {},
    created () {
      this.initData()
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/themes/default/index';
  @import '../../assets/styles/mixins/index';

  @headerPrefixCls: ~'@{css-prefix}header';

  .@{headerPrefixCls} {
    & &-btn {
      .@{headerPrefixCls}-btn-svg {
        display: block;
        width: 35px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #aba9ab;
        border-radius: 22.5px;
        box-sizing: border-box;

        .svg-icon {
          display: inline-block;
          width: 15px;
          height: 15px;
          fill: #aba9ab;
        }
      }
    }
  }
</style>
