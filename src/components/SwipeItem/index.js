import { PREFIX } from '@config/config'
import SwipeItem from './src/index'

SwipeItem.name = 'SwipeItem'

SwipeItem.install = function(Vue) {
  Vue.component(`${PREFIX}${SwipeItem.name}`, SwipeItem)
}

export default SwipeItem
