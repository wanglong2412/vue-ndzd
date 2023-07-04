<template>
  <div class="cyui-btn cyui-btn-inline" :class="typeClass">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'StatusTag',
    mixins: [],
    components: {},
    data() {
      return {}
    },
    props: {
      type: {
        type: [String],
        default: 'primary'
      }
    },
    computed: {
      typeClass() {
        return `cyui-btn-${this.type}`
      }
    },
    methods: {
      goDetail() {
        let { id } = this.detailInfo
        this.$emit('go-detail', id)
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

  .@{css-prefix}btn {
    display: inline-block;
    min-width: 56px;
    height: 20px;
    padding: 0 10px;
    line-height: 20px;
    font-size: 12px;
    border: 0;
    border-radius: 2px;

    &.@{css-prefix}label-2 {
      font-size: 14px;
    }

    &.@{css-prefix}btn-primary {
      &,
      &:active,
      &.@{css-prefix}btn-active {
        background: rgba(240, 223, 199, 0.4);
        color: #C3A475;
      }
    }

    &.@{css-prefix}btn-success {
      &,
      &:active,
      &.@{css-prefix}btn-active {
        background: #ECF8F0;
        color: #329220;
      }
    }

    &.@{css-prefix}btn-blue {
      &,
      &:active,
      &.@{css-prefix}btn-active {
        background: #E9F1FF;
        color: #3593FE;
      }
    }

    &.@{css-prefix}btn-error {
      &,
      &:active,
      &.@{css-prefix}btn-active {
        background: rgba(229, 86, 63, 0.1);
        color: #E5563F;
      }
    }

    &.@{css-prefix}btn-gray {
      &,
      &:active,
      &.@{css-prefix}btn-active {
        background: rgba(227, 227, 227, 0.4);
        color: #B9B9B9;
      }
    }
  }

</style>
