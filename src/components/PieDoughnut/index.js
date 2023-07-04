import { PREFIX } from '@config/config'
import PieDoughnut from './src/PieDoughnut'

PieDoughnut.install = function(Vue) {
  Vue.component(`${PREFIX}${PieDoughnut.name}`, PieDoughnut)
}

export default PieDoughnut
