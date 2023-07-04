<template>
  <div class="cyui-timeline-approve">
    <div class="cyui-timeline">
      <div class="cyui-timeline-item cyui-timeline-selected"
           v-for="(item, index) in listData"
           :key="`timeline${index}`">
        <div class="cyui-timeline-line">
          <div class="cyui-timeline-head">
            <p class="cyui-timeline-date"> {{ item[props.approvalDate] | formatDate('yyyy-MM-dd')}} </p>
            <p class="cyui-timeline-time"> {{ item[props.approvalDate] | formatDate('HH:mm:ss')}} </p>
          </div>
          <div class="cyui-timeline-node">
            <div class="cyui-timeline-dot"></div>
            <div class="cyui-timeline-tail" v-if="data.length > 1 && index < data.length - 1"></div>
          </div>
          <div class="cyui-timeline-content">
            <p class="cyui-timeline-title"> 处理人：{{ item[props.approvalUser] }}</p>
            <p class="cyui-timeline-describe"> {{ item[props.approvalConclusion] || '-' }} </p>
          </div>
          <div class="cyui-timeline-tag">
            <div>{{ item[props.approvalStatus] }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="cyui-timeline-action"
         v-if="data.length > showMoreLength"
         @click="handleShowMore">
      <div class="cyui-timeline-action-btn">
        <div class="cyui-timeline-action-arrow"
             :class="[ !isShowMore ? 'cyui-timeline-action-arrow-down' : 'cyui-timeline-action-arrow-top' ]"></div>
        <div>{{ !isShowMore ? '展开' : '收起' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import filters from '@filters/filters'

  export default {
    name: 'ApprovalProcess',
    mixins: [filters],
    components: {},
    data () {
      return {}
    },
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      },
      props: {
        type: Object,
        default () {
          return {
            approvalDate: 'approvalDate',
            approvalUser: 'approvalUser',
            approvalConclusion: 'approvalConclusion',
            approvalStatus: 'approvalStatus'
          }
        }
      },
      isShowMore: { // 显示更多
        type: Boolean,
        default: false
      },
      showMoreLength: { // 显示更多数据的长度
        type: [Number, String],
        default: 3
      }
    },
    computed: {
      listData () {
        let { data, isShowMore, showMoreLength } = this
        if (isShowMore) {
          return data
        } else {
          return data.filter((item, index) => {
            return index < showMoreLength
          })
        }
      }
    },
    methods: {
      handleShowMore () {
        let { isShowMore } = this
        this.$emit('on-show-more', !isShowMore)
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

  // 时间轴
  .@{css-prefix}timeline {
    padding: 20px 0 15px;
    background-color: #fff;

    &-item {
      position: relative;
      display: flex;
      min-height: 80px;
      padding-left: 15px;
      background-color: #fff;
      overflow: hidden;
      vertical-align: middle;
      transition: background-color 200ms;
      align-items: center;

      .@{css-prefix}timeline-line {
        position: relative;
        display: flex;
        flex: 1;
        align-items: flex-start;
        align-self: stretch;
        padding-right: 15px;
        overflow: hidden;

        .@{css-prefix}timeline-head {
          align-self: stretch;
          line-height: 20px;
          font-size: 12px;
          color: #4a4a4a;
          text-align: center;

          .@{css-prefix}timeline-date {
            font-size: 14px;
          }
        }

        .@{css-prefix}timeline-node {
          position: relative;
          align-self: stretch;
          margin: 0 15px;

          .@{css-prefix}timeline-dot {
            width: 13px;
            height: 13px;
            margin-top: 10px;
            border-radius: 100%;
            background-color: #bbbbbb;
          }

          .@{css-prefix}timeline-tail {
            position: absolute;
            content: '';
            width: 1px;
            top: 33px;
            bottom: 0;
            left: 6px;
            background-color: #bbbbbb;
          }
        }

        .@{css-prefix}timeline-content {
          flex: 1;
          width: auto;
          padding-bottom: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #4a4a4a;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          word-wrap: normal;

          .@{css-prefix}timeline-title {
            font-size: 14px;
          }

          .@{css-prefix}timeline-describe {
            margin-top: 5px;
            font-size: 12px;
            color: #9b9b9b;
          }
        }

        .@{css-prefix}timeline-tag {
          position: relative;
          margin-left: 15px;
          padding-top: 2px;
          line-height: 24px;
          font-size: 14px;
          color: #333;
        }
      }

      &:last-of-type {
        min-height: 45px;

        .@{css-prefix}timeline-line {
          .@{css-prefix}timeline-tail {
            display: none;
          }

          .@{css-prefix}timeline-content {
            padding-bottom: 0;
          }
        }
      }
    }

    &-selected {
      .@{css-prefix}timeline-line {
        .@{css-prefix}timeline-node {

          .@{css-prefix}timeline-dot {
            width: 13px;
            height: 13px;
            margin-top: 10px;
            background-color: @brand-primary;
          }

          .@{css-prefix}timeline-tail {
          }
        }
      }
    }
  }

  .@{css-prefix}timeline-approve {
    margin-bottom: 10px;
    background-color: #fff;
  }

  .@{css-prefix}timeline-action {
    padding-bottom: 15px;
    line-height: 24px;
    font-size: 14px;
    color: #333;
    text-align: center;

    & &-btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    /* 箭头 */

    .@{css-prefix}timeline-action-arrow {
      position: relative;
      display: block;
      width: 15px;
      height: 15px;
      margin-right: 5px;
      visibility: hidden;

      &:after {
        content: " ";
        .setArrow(right, 10px, #999, 2px);
        position: absolute;
        top: 50%;
        left: 50%;
        transition: transform 0.3s;
      }

      &-top {
        visibility: visible;

        &:after {
          transform: translate(-50%, -25%) rotate(-45deg);
        }
      }

      &-down {
        visibility: visible;

        &:after {
          transform: translate(-50%, -75%) rotate(135deg);
        }
      }

    }
  }

</style>
