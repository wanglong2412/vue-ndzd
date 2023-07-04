import { PREFIX } from '@config/config'
import Scroller from './src/Scroller'

Scroller.install = function (Vue) {
  Vue.component(`${PREFIX}${Scroller.name}`, Scroller)
}

export default Scroller
