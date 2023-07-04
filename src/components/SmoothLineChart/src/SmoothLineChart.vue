<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from './echarts'
  import { formatPx2Rem } from '@utils/index'
  import dotPic from '@assets/images/operationalIndicator/img_001.png'

  export default {
    name: 'SmoothLineChart',
    mixins: [],
    components: {},
    data() {
      return {
        chart: null
      }
    },
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      chartData: {
        type: Object,
        default() {
          return {
            data: [],
            date: []
          }
        }
      }
    },
    computed: {},
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el)
        let _this = this
        let _chartData = this.chartData
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              snap: true,
              label: {
                fontSize: 12,
                lineHeight: 20,
                backgroundColor: '#A67342',
                color: '#FFFFFF'
              }
            },
            formatter: function(params) {
              console.log(params)
              _this.$emit('change', params)
              return ''
            }
          },
          grid: {
            top: '15%',
            left: '5%',
            right: '8%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: true, // 两边的数据是否到达边界
            axisLine: {
              lineStyle: {
                color: '#F4F5F6',
                type: 'dashed'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#A2A2A2',
              fontSize: `${formatPx2Rem(9)}rem`,
              align: 'center',
              margin: 15,
              interval: (index, value) => {
                // console.log(index)
                // console.log(value)
                return index === 0 || index === _chartData.date.length - 1
              },
              formatter: function(value, index) {
                if (index === 0) {
                  return `{paddingLeft|${value}}`
                } else if (index === _chartData.date.length - 1) {
                  return `{paddingRight|${value}}`
                } else {
                  return ' '
                }
              },
              rich: {
                paddingRight: {
                  padding: [0, 50, 0, 0],
                  fontSize: `${formatPx2Rem(9)}rem`
                },
                paddingLeft: {
                  padding: [0, 0, 0, 50],
                  fontSize: `${formatPx2Rem(9)}rem`
                }
              }
            },
            data: _chartData.date
          },
          yAxis: {
            type: 'value',
            boundaryGap: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#A2A2A2',
              fontSize: `${formatPx2Rem(9)}rem`
            },
            splitNumber: 2,
            splitLine: {
              lineStyle: {
                color: '#F4F5F6',
                type: 'dashed'
              }
            }
          },
          series: [{
            type: 'line',
            data: _chartData.data,
            lineStyle: {
              color: '#CDA66E'
            },
            symbol: `image://${dotPic}`,
            symbolSize: 10,
            showSymbol: false,
            smooth: true
          }]
        })
      },
      async initData() {
        this.$nextTick(() => {
          if (this.chart) this.chart.clear()
          this.initChart()
        })
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    watch: {
      chartData: {
        handler: function(newVal, oldVal) {
          console.log(newVal)
          this.initData()
        },
        deep: true,
        immediate: true
      }
    },
    created() {
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/themes/default/index';
  @import '../../../assets/styles/mixins/index';

</style>
