import { PREFIX } from '@config/config'
import PieLineChart from './src/PieLineChart'

PieLineChart.install = function(Vue) {
  Vue.component(`${PREFIX}${PieLineChart.name}`, PieLineChart)
}

export default PieLineChart
