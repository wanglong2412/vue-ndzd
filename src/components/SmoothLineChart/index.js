import { PREFIX } from '@config/config'
import SmoothLineChart from './src/SmoothLineChart'

SmoothLineChart.install = function(Vue) {
  Vue.component(`${PREFIX}${SmoothLineChart.name}`, SmoothLineChart)
}

export default SmoothLineChart
