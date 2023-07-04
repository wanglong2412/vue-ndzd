<template>
  <div class="cyui-card cyui-examine-item" @click="goDetail">
    <div class="cyui-card-header">
      <div class="cyui-card-header-line cyui-hairline-bottom">
        <div class="cyui-card-header-content">
          <div class="cyui-flexbox">
            <div><img src="../../../assets/images/relate.png" alt=""></div>
            <div class="cyui-flexbox-item cyui-ellipsis">查验流水号：{{detailInfo.invoiceserno}}</div>
          </div>
        </div>
        <div class="cyui-card-header-extra">
          <tag :type="noteStatusInfo.type"
               :size="noteStatusInfo.size">{{noteStatusInfo.text}}
          </tag>
        </div>
      </div>
    </div>
    <div class="cyui-card-body">
      <div class="cyui-examine-collect">
        <span>问题笔数：{{detailInfo.checkproblemno || 0}}</span>
        <span>异常笔数：{{detailInfo.checkexceptionno || 0}}</span>
        <span>通过笔数：{{detailInfo.checksucessno || 0}}</span>
      </div>
    </div>
    <div class="cyui-card-footer">
      <div class="cyui-card-footer-line">
        <div class="cyui-card-footer-content">
          <span>查验时间：{{detailInfo.querydate}}</span>
        </div>
        <div class="cyui-card-header-extra">
          <span>查验总笔数：{{detailInfo.checktotalno || 0}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import filters from '@filters/filters'
  import Tag from '@components/Tag'

  export default {
    name: 'ListItem',
    mixins: [filters],
    components: {
      Tag
    },
    data () {
      return {}
    },
    props: {
      detailInfo: {
        type: Object,
        require: true,
        default () {
          return {}
        }
      }
    },
    computed: {
      noteStatusInfo () { // 需求状态信息
        let { checkstatus } = this.detailInfo
        let tagInfo = {}
        if (+checkstatus === 1) {
          tagInfo = {
            type: 'gray',
            text: '待处理',
            size: 'default'
          }
        } else if (+checkstatus === 2) {
          tagInfo = {
            type: 'primary',
            text: '处理中',
            size: 'default'
          }
        } else if (+checkstatus === 3) {
          tagInfo = {
            type: 'success',
            text: '已处理',
            size: 'default'
          }
        }
        return tagInfo
      }
    },
    methods: {
      goDetail () {
        let { invoiceserno } = this.detailInfo
        this.$emit('go-detail', invoiceserno)
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

  .@{css-prefix}examine-item {
    border-radius: 5px;

    &:not(:first-child) {
      margin-top: 10px;
    }

    .@{css-prefix}card-header {
      min-height: 40px;
      font-size: 12px;

      .@{css-prefix}card-header-content {
        img {
          display: block;
          width: 20px;
          height: 20px;
          margin-right: 3px;
        }
      }
    }

    .@{css-prefix}examine-collect {
      padding: 5px 15px;
      line-height: 24px;
      font-size: 12px;

      > span {
        &:not(:last-child) {
          margin-right: 15px;
        }
      }
    }

    .@{css-prefix}card-footer {
      padding-bottom: 12px;
      min-height: 24px;
      font-size: 12px;
    }
  }

  .@{css-prefix}list-item {
    &.@{css-prefix}list-multiple {
      padding: 12px 0 12px 0;
    }

    .@{css-prefix}list-line {
      padding-right: 0;

      .@{css-prefix}list-content {
        white-space: normal;
      }

      .@{css-prefix}list-extra {
        flex-basis: 50px;
      }

      .@{css-prefix}list-brief {
        margin-bottom: 5px;
        font-size: 12px;
        line-height: 18px;
        color: #9b9b9b;
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .@{css-prefix}list-title {
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        color: #4a4a4a;
      }

      .@{css-prefix}list-date {
        font-size: 12px;
        line-height: 24px;
        color: #4a4a4a;
      }

      .@{css-prefix}list-exhibitor {
        font-size: 13px;
        line-height: 24px;
        color: #4a4a4a;
      }
    }
  }

</style>
