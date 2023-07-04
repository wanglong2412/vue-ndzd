<template>
  <div class="cyui-card cyui-analyze-item" @click="goDetail">
    <div class="cyui-card-header">
      <div class="cyui-card-header-line">
        <div class="cyui-card-header-content">
          <div class="cyui-flexbox">
            <div class="cyui-flexbox-item">
              <span class="cyui-analyze-name" v-if="titleKey !== 'dataBatch'">{{ detailInfo[titleKey] }}</span>
              <span class="cyui-analyze-name" v-else>{{ detailInfo[titleKey] | filterDataBatch }}</span>
              <span class="cyui-analyze-percent" style="color: #9b9b9b;">完成比例：{{ detailInfo.rate }}</span>
            </div>
            <div v-if="statusMap[detailInfo.status]">
              <status-tag
                :type="statusMap[detailInfo.status]['style']">
                {{statusMap[detailInfo.status]['text']}}
              </status-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cyui-card-body">
      <div class="cyui-flexbox cyui-flexbox-wrap cyui-flexbox-align-center cyui-analyze-info">
        <div class="cyui-analyze-info-item">
          <p class="cyui-analyze-info-number">{{ detailInfo.totalCount || 0 }}</p>
          <p class="cyui-analyze-info-text">全部</p>
        </div>
        <div class="cyui-analyze-info-item">
          <p class="cyui-analyze-info-number">{{ detailInfo.successCount || 0 }}</p>
          <p class="cyui-analyze-info-text">成功</p>
        </div>
        <div class="cyui-analyze-info-item">
          <p class="cyui-analyze-info-number">{{ detailInfo.errorCount || 0 }}</p>
          <p class="cyui-analyze-info-text">失败</p>
        </div>
        <div class="cyui-analyze-info-item">
          <p class="cyui-analyze-info-number">{{ detailInfo.runningCount || 0 }}</p>
          <p class="cyui-analyze-info-text">运行中</p>
        </div>
        <div class="cyui-analyze-info-item">
          <p class="cyui-analyze-info-number">{{ detailInfo.prepareCount || 0 }}</p>
          <p class="cyui-analyze-info-text">准备中</p>
        </div>
        <div class="cyui-analyze-info-item">
          <p class="cyui-analyze-info-number">{{ detailInfo.unRunCount || 0 }}</p>
          <p class="cyui-analyze-info-text">未运行</p>
        </div>
      </div>
    </div>
    <div class="cyui-card-footer">
      <div class="cyui-card-footer-line">
        <div class="cyui-card-footer-content">
          <div class="cyui-flexbox">
            <div class="cyui-flexbox-item">
              耗时：{{ detailInfo.usedTime | filterUsedTime }}
              ({{ detailInfo.startTime || '-' }} ~ {{ detailInfo.endTime || '-' }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import filters from '@filters/filters'
  import StatusTag from '@components/StatusTag'
  import { statusMap } from '@dictionaries/operationalIndicator'

  export default {
    name: 'AnalyzeListItem',
    mixins: [filters],
    components: {
      StatusTag
    },
    data () {
      return {
        statusMap
      }
    },
    props: {
      detailInfo: {
        type: Object,
        default () {
          return {}
        }
      },
      titleKey: { // 标题Key值
        type: String,
        require: true,
        default: ''
      }
    },
    computed: {},
    methods: {
      goDetail () {
        this.$emit('go-detail', this.detailInfo)
      },
      async initData () {
      }
    },
    filters: {
      filterDataBatch (value) { // 格式化批处理日期
        return value ? moment(value, "YYYYMMDD").format('YYYY-MM-DD') : '-'
      },
      filterUsedTime (value = '') { // 格式化耗时
        let days = moment.duration(value).days()
        let hours = moment.duration(value).hours()
        let minutes = moment.duration(value).minutes()
        let seconds = moment.duration(value).seconds()
        if (days > 0) {
          return `${days}天${hours}时${minutes}分${seconds}秒`
        } else if (days === 0 && hours > 0) {
          return `${hours}时${minutes}分${seconds}秒`
        } else if (days === 0 && hours === 0 && minutes > 0) {
          return `${minutes}分${seconds}秒`
        } else {
          return `${seconds}秒`
        }
      }
    },
    watch: {},
    created () {
      // this.initData()
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/themes/default/index';
  @import '../../../assets/styles/mixins/index';

  .@{css-prefix}analyze-item {
    &:not(:first-child) {
      margin-top: 10px;
    }

    .@{css-prefix}card-header {
      min-height: 40px;
      font-size: 12px;

      .@{css-prefix}analyze-name {
        display: inline-block;
        min-width: 90px;
        color: #4a4a4a;
        font-weight: 500;
      }

      .@{css-prefix}analyze-percent {
        display: inline-block;
      }
    }

    .@{css-prefix}card-footer {
      padding: 5px 15px;
      min-height: 36px;
      line-height: 20px;
      font-size: 12px;
      color: #9b9b9b;
    }

    .@{css-prefix}analyze-info {
      padding: 0 15px;

      &-item {
        display: block;
        flex: 1;
        height: 50px;
        margin-right: 10px;
        padding: 5px 0;
        text-align: center;
        background-color: rgba(216, 216, 216, 0.2);

        &:last-of-type {
          margin-right: 0;
        }

        .@{css-prefix}analyze-info-number {
          line-height: 20px;
          font-size: 12px;
          color: #4a4a4a;
        }

        .@{css-prefix}analyze-info-text {
          line-height: 20px;
          font-size: 12px;
          color: #9b9b9b;
        }
      }
    }
  }
</style>
