<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from './echarts'
  import { formatPx2Rem, formatMoney } from '@utils/index'
  // import dotPic from '@assets/images/operationalIndicator/img_001.png'

  export default {
    name: 'PieLineChart',
    mixins: [],
    components: {},
    data() {
      return {
        chart: null,
        currentIndex: 0
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
          return {}
        }
      }
    },
    computed: {},
    methods: {
      formatMoney,
      handlePieSelected(chartData) {
        let copyChartData = JSON.parse(JSON.stringify(chartData))
        let sortChartData = copyChartData.sort((a, b) => a.value - b.value)
        if (sortChartData.length > 0) {
          this.chart.dispatchAction({
            type: 'highlight',
            name: sortChartData[sortChartData.length - 1].name
          })
        }
      },
      handlePieReset(chartData) {
        chartData.forEach(item => {
          if (item.name !== name) {
            this.chart.dispatchAction({
              type: 'downplay',
              name: item.name
            })
          }
        })
      },
      getPieChartData(index) {
        let copyChartData = JSON.parse(JSON.stringify(this.chartData))
        let pieListData = []
        copyChartData.data.forEach((item) => {
          item.listData.forEach((value, i) => {
            if (index === i) {
              pieListData.push({
                name: item.name,
                value
              })
            }
          })
        })
        return pieListData
      },
      initChart() {
        this.chart = echarts.init(this.$el)
        let htmlFontSize = parseFloat(document.getElementsByTagName('html')[0].style.fontSize) // 获取当前html的font-size
        let _this = this
        let copyChartData = JSON.parse(JSON.stringify(this.chartData))
        this.chart.setOption({
          title: {
            left: '4%',
            top: '57%',
            text: '三生三世'
          },
          tooltip: {
            trigger: 'axis',
            textStyle: {
              fontSize: `${formatPx2Rem(22) * htmlFontSize}`
            },
            backgroundColor: 'rgba(50,50,50,0.5)',
            position: function(point, params, dom, rect, size) {
              // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
              // 提示框位置
              let x = 0 // x坐标位置
              let y = 0 // y坐标位置
              // 当前鼠标位置
              let pointX = point[0]
              let pointY = point[1]
              // 外层div大小
              // let viewWidth = size.viewSize[0];
              // let viewHeight = size.viewSize[1];
              // 提示框大小
              let boxWidth = size.contentSize[0]
              let boxHeight = size.contentSize[1]
              // boxWidth > pointX 说明鼠标左边放不下提示框
              if (boxWidth > pointX) {
                x = 5
              } else { // 左边放的下
                x = pointX - boxWidth
              }
              // boxHeight > pointY 说明鼠标上边放不下提示框
              if (boxHeight > pointY) {
                y = 5
              } else { // 上边放得下
                y = pointY - boxHeight
              }
              return [x, y]
            },
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            icon: 'roundRect',
            left: '15', // center
            top: '43%',
            right: '15',
            bottom: '20',
            data: copyChartData.data.map(item => item.name),
            selectedMode: true
          },
          dataset: {
            source: [
              [
                '日期',
                ...copyChartData.date
              ],
              ...copyChartData.data.map(item => {
                return [
                  item.name,
                  ...item.listData
                ]
              })
            ]
          },
          grid: {
            top: '65%',
            left: '5%',
            right: '5%',
            bottom: '0%',
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
              fontSize: `${formatPx2Rem(18) * htmlFontSize}`,
              lineHeight: `${formatPx2Rem(48) * htmlFontSize}`,
              align: 'center',
              margin: 20,
              //   interval: (index, value) => {
              //     // console.log(index)
              //     // console.log(value)
              //     return true
              //   },
              interval: 1,
              rotate: 40,
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
            }
            // data: copyChartData.date
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
              fontSize: `${formatPx2Rem(18) * htmlFontSize}`
            },
            splitNumber: 2,
            splitLine: {
              lineStyle: {
                color: '#F4F5F6',
                type: 'dashed'
              }
            }
          },
          series: [
            ...copyChartData.data.map(item => {
              return {
                name: item.name,
                type: 'line',
                stack: '总量',
                itemStyle: {
                  normal: {
                    color: item.color,
                    lineStyle: { width: 0 }
                  }
                },
                lineStyle: {
                  width: 0
                },
                areaStyle: {
                  color: item.color
                },
                // symbol: `image://${dotPic}`,
                symbolSize: 1,
                showSymbol: false,
                smooth: true,
                seriesLayoutBy: 'row'
              }
            }),
            {
              type: 'pie',
              id: 'pie',
              name: 'pie',
              top: 10,
              radius: ['45%', '65%'],
              center: ['48%', '35%'],
              avoidLabelOverlap: false,
              height: `${formatPx2Rem(650) * htmlFontSize}`,
              label: {
                // show: false,
                // position: 'center',
                normal: {
                  show: false,
                  position: 'center',
                  formatter: function(params) {
                    // 设置圆饼图中间文字排版
                    console.log('===================================')
                    console.log(params)
                    return _this.formatMoney(params.value[_this.currentIndex + 1], 0, '') + '\n\n' + params.percent + '%\n\n' + params.name.substring(0, 5) + '\n' + params.name.substring(6)
                  }
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '12',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              encode: {
                itemName: '日期',
                value: copyChartData.date[copyChartData.date.length - 1],
                tooltip: copyChartData.date[copyChartData.date.length - 1]
              },
              color: copyChartData.data.map(item => item.color)
            }
          ]
        })
        this.chart.on('legendselectchanged', function(params) {
          // console.log(params)
          // console.log(_this.currentIndex)
          let { selected } = params
          let pieListData = _this.getPieChartData(_this.currentIndex)
          // console.log(pieListData)
          let keys = Object.keys(selected).filter(item => selected[item])
          let resultChartData = pieListData.filter(item => keys.indexOf(item.name) !== -1)
          _this.handlePieReset(resultChartData)
          _this.handlePieSelected(resultChartData)
        })
        this.chart.on('mouseover', function(params) {
          console.log(params)
          let { seriesId, name } = params
          let pieListData = _this.getPieChartData(_this.currentIndex)
          if (seriesId === 'pie') {
            _this.handlePieReset(pieListData)
            _this.chart.dispatchAction({
              type: 'highlight',
              name: name
            })
          }
        })
        this.chart.on('updateAxisPointer', function(event) {
          // console.log(event)
          let xAxisInfo = event.axesInfo[0]
          // console.log(xAxisInfo)
          if (xAxisInfo) {
            let pieListData = _this.getPieChartData(xAxisInfo.value)
            let dimension = xAxisInfo.value + 1
            _this.currentIndex = xAxisInfo.value
            _this.chart.setOption({
              series: {
                id: 'pie',
                label: {
                  // show: false,
                  // position: 'center',
                  normal: {
                    show: false,
                    position: 'center',
                    formatter: function(params) {
                      // 设置圆饼图中间文字排版
                      console.log('===================================')
                      console.log(params)
                      return _this.formatMoney(params.value[_this.currentIndex + 1], 0, '') + '\n\n' + params.percent + '%\n\n' + params.name.substring(0, 5) + '\n' + params.name.substring(6)
                    }
                  }
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            })
            _this.handlePieReset(pieListData)
            _this.handlePieSelected(pieListData)
          }
        })
      },
      async initData() {
        this.$nextTick(() => {
          if (this.chart) this.chart.clear()
          this.currentIndex = this.chartData.data[0].listData.length - 1
          let pieListData = this.getPieChartData(this.currentIndex)
          this.initChart()
          this.handlePieSelected(pieListData)
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
          // console.log(newVal)
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
