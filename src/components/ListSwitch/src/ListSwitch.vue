<template>
  <div class="cyui-list-item cyui-switch-item">
    <div class="cyui-list-line">
      <div class="cyui-list-content" :class="{'is-selected': checked}">{{label}}</div>
      <div class="cyui-list-extra" style="flex-basis: 30%;">
        <van-switch v-model="checked"
                    :disabled="disabled"
                    @change="handleChange"/>
      </div>
    </div>
  </div>
</template>

<script>
  import filters from '@filters/filters'

  export default {
    name: 'ListSwitch',
    mixins: [filters],
    components: {},
    data() {
      return {
        checked: false
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: '-'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {},
    methods: {
      handleChange(value) {
        // console.log(value)
        this.$emit('change', value)
        this.$emit('input', value)
      },
      async initData() {
      }
    },
    filters: {},
    watch: {
      value: {
        handler: function(newVal, oldVal) {
          if (newVal !== this.checked) {
            this.checked = newVal
          }
        },
        immediate: true
      }
    },
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

  .@{css-prefix}switch-item {
    min-height: 47px;

    .@{css-prefix}list-line {
      .@{css-prefix}list-content {
        padding: 10px 0;
        line-height: 24px;
        font-size: 15px;
        color: #999999;
        user-select: none;

        &.is-selected {
          color: #333333;
        }
      }

      .@{css-prefix}list-extra {
        padding: 10px 0;

        & /deep/ .van-switch {
          display: block;
          float: right;
          width: 40px;
          height: 20px;
          background-color: #E7E6E5;
          border: 1px solid #E5E5E5;
          border-radius: 20px;
          font-size: 20px;
          box-sizing: border-box;

          .van-switch__node {
            top: 0;
            left: 0;
            width: 18px;
            height: 18px;
            border-radius: 100%;
          }

          &.van-switch--on {
            background-color: #CDA76E;
            border-color: #CDA76E;

            .van-switch__node {
              transform: translateX(20px);
            }
          }
        }
      }
    }

    &:not(:last-of-type) {
      .@{css-prefix}list-line {
        .hairline('bottom', 1px, #EAEAEA);
      }
    }
  }
</style>
