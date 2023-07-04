<template>
  <span class="cyui-btn cyui-btn-inline" :class="[typeClass, wordBigClass]">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'Tag',
    mixins: [],
    components: {},
    data () {
      return {}
    },
    props: {
      type: {
        type: [String],
        default: 'primary'
      },
      size: {
        type: [String],
        default: ''
      }
    },
    computed: {
      typeClass () {
        return `cyui-btn-${this.type}`
      },
      wordBigClass () {
        if (this.size === 'large') {
          return 'cyui-label-2'
        } else {
          return ''
        }
      }
    },
    methods: {
      goDetail () {
        let { id } = this.detailInfo
        this.$emit('go-detail', id)
      },
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
  @import '../../../assets/styles/themes/default/index';
  @import '../../../assets/styles/mixins/index';

  .@{css-prefix}btn {
    padding: 0 10px;
    min-width: 40px;
    height: 24px;
    font-size: 10px;
    line-height: 24px;
    border: 0;
    border-radius: 3px;

    &.@{css-prefix}label-2 {
      font-size: 14px;
    }

    &.@{css-prefix}btn-primary {
      &,
      &:active,
      &.@{css-prefix}btn-active {
        color: #fff;
        background-color: #3183ff;
        border-color: #3183ff;
      }
    }

    &.@{css-prefix}btn-success {
      &,
      &:active,
      &.@{css-prefix}btn-active {
        color: #fff;
        background-color: #52B156;
        border-color: #52B156;
      }
    }

    &.@{css-prefix}btn-gray {
      &,
      &:active,
      &.@{css-prefix}btn-active {
        color: #fff;
        background-color: #a1a1a1;
        border-color: #a1a1a1;
      }
    }

    &.@{css-prefix}btn-error {
      &,
      &:active,
      &.@{css-prefix}btn-active {
        color: #fff;
        background-color: #f44;
        border-color: #f44;
      }
    }

    &.@{css-prefix}btn-danger {
      &,
      &:active,
      &.@{css-prefix}btn-active {
        color: #fff;
        background-color: rgb(242, 130, 106);
        border-color: rgb(242, 130, 106);
      }
    }
  }

</style>
