<template>
  <div class="cyui-field-list">
    <van-cell-group>
      <template v-for="(item, index) in fields">
        <template v-if="item.filterMethod">
          <van-cell
            :title="item.title"
            :[item.type]="(item.filterMethod)(`${data[item.key]}`) || '-'"
            :key="`baseInfo${index}`"
          />
        </template>
        <template v-else>
          <van-cell
            :title="item.title"
            :[item.type]="data[item.key] || '-'"
            :key="`baseInfo${index}`"
          />
        </template>
      </template>
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    name: 'FieldListInfo',
    mixins: [],
    components: {},
    data() {
      return {}
    },
    props: {
      fields: {
        type: Array,
        default() {
          return []
        }
      },
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {},
    methods: {},
    watch: {},
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/themes/default/index';
  @import '../../../assets/styles/mixins/index';

  .@{css-prefix}field-list {

    & /deep/ .van-cell-group {
      &::after {
        display: none;
      }

      .van-cell {
        padding: 12px 0;

        &.@{css-prefix}opinion {
          .van-field {
            padding: 0;
          }
        }
      }

      .van-cell__title {
        color: #333;
        font-size: 15px;
      }

      .van-cell__value {
        color: #A67342;
        font-size: 15px;
      }

      .van-cell__label {
        margin-top: 5px;
        font-size: 12px;
        line-height: 20px;
      }

      .van-cell:not(:last-child)::after {
        left: 0;
        right: 0;
        border-bottom: 1px solid #F6F6F6;
      }
    }
  }
</style>
