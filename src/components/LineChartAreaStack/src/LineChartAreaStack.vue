<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from './echarts'
  import { formatPx2Rem } from '@utils/index'
  import dotPic from '@assets/images/operationalIndicator/img_001.png'

  export default {
    name: 'LineChartAreaStack',
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
            data: [
              {
                name: '测试数据一',
                color: '#CDA66E',
                listData: [40, 30, 25, 60, 70, 50, 40, 60, 30, 60, 80, 50]
              },
              {
                name: '测试数据二',
                color: '#4AA6F6',
                listData: [80, 60, 80, 100, 120, 100, 80, 100, 70, 150, 100, 120]
              },
              {
                name: '测试数据三',
                color: '#F38487',
                listData: [120, 90, 140, 120, 150, 140, 180, 150, 90, 100, 160, 180]
              }
            ],
            date: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        }
      }
    },
    computed: {},
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el)
        let _this = this
        let copyChartData = JSON.parse(JSON.stringify(this.chartData))
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            },
            formatter: function(params) {
              console.log(params)
              let data = params.map(item => {
                return {
                  value: item.value,
                  name: item.seriesName,
                  color: item.color
                }
              })
              _this.$emit('change', data)
              return ''
            }
          },
          grid: {
            top: '15%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false, // 两边的数据是否到达边界
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
                return true
              },
              /* formatter: function(value, index) {
                if (index === 0) {
                  return `{paddingLeft|${value}}`
                } else if (index === _chartData.date.length - 1) {
                  return `{paddingRight|${value}}`
                } else {
                  return ' '
                }
              }, */
              rich: {}
            },
            data: copyChartData.date
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
          series: copyChartData.data.map(item => {
            return {
              name: item.name,
              type: 'line',
              stack: '总量',
              areaStyle: {
                color: item.color
              },
              symbol: `image://${dotPic}`,
              symbolSize: 10,
              showSymbol: false,
              smooth: true,
              data: item.listData
            }
          })
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
