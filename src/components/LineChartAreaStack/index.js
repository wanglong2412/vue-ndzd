import { PREFIX } from '@config/config'
import LineChartAreaStack from './src/LineChartAreaStack'

LineChartAreaStack.install = function(Vue) {
  Vue.component(`${PREFIX}${LineChartAreaStack.name}`, LineChartAreaStack)
}

export default LineChartAreaStack
