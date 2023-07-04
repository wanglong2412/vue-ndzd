<template>
  <div class="cyui-layout">
    <div class="cyui-layout-header">
      <slot name="header"></slot>
    </div>
    <div class="cyui-layout-wrapper">
      <slot></slot>
    </div>
    <div class="cyui-layout-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Layout',
    components: {},
    props: {},
    data () {
      return {}
    },
    computed: {},
    created () {
    },
    watch: {},
    methods: {}
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/styles/themes/default/index';
  @import '../../../assets/styles/mixins/index';
</style>
