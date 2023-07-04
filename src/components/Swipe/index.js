import { PREFIX } from '@config/config'
import Swipe from './src/index'

Swipe.name = 'Swipe'

Swipe.install = function(Vue) {
  Vue.component(`${PREFIX}${Swipe.name}`, Swipe)
}

export default Swipe
