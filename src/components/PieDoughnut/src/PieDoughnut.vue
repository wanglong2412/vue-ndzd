<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from './echarts'
  import { formatPx2Rem } from '@utils/index'

  export default {
    name: 'PieDoughnut',
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
        type: Array,
        default() {
          return [
            { value: 335, name: 'XXXXX', color: '' },
            { value: 310, name: 'YYYYY', color: '' },
            { value: 234, name: 'ZZZZZ', color: '' }
          ]
        }
      }
    },
    computed: {},
    methods: {
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
      initChart() {
        this.chart = echarts.init(this.$el)
        let htmlFontSize = parseFloat(document.getElementsByTagName('html')[0].style.fontSize) // 获取当前html的font-size
        let _this = this
        // let _chartData = this.chartData
        let copyChartData = JSON.parse(JSON.stringify(this.chartData))
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            left: '15', // center
            top: '15',
            right: '15',
            bottom: '20',
            data: copyChartData.map(item => item.name),
            selectedMode: true
          },
          grid: {
            top: '5%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          series: [
            {
              name: '数据来源',
              type: 'pie',
              top: '50',
              radius: ['40%', '60%'],
              center: ['50%', '35%'],
              avoidLabelOverlap: false,
              height: `${formatPx2Rem(430) * htmlFontSize}`,
              label: {
                // show: false,
                // position: 'center',
                normal: {
                  show: false,
                  position: 'center',
                  formatter: function(data) {
                    // 设置圆饼图中间文字排版
                    // console.log(data)
                    return data.value + '\n' + data.name
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
              data: copyChartData
            }
          ]
        })
        this.chart.on('legendselectchanged', function(params) {
          // console.log(params)
          let { name, selected } = params
          let keys = Object.keys(selected).filter(item => selected[item])
          if (!selected[name]) {
            let resultChartData = copyChartData.filter(item => keys.indexOf(item.name) !== -1)
            _this.handlePieSelected(resultChartData)
          } else {
            copyChartData.forEach(item => {
              if (item.name !== name) {
                _this.chart.dispatchAction({
                  type: 'downplay',
                  name: item.name
                })
              }
            })
          }
          _this.$emit('change', keys)
        })
      },
      async initData() {
        this.$nextTick(() => {
          if (this.chart) this.chart.clear()
          this.initChart()
          this.handlePieSelected(this.chartData)
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
