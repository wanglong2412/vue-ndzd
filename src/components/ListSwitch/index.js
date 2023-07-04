import { PREFIX } from '@config/config'
import ListSwitch from './src/ListSwitch'

ListSwitch.install = function(Vue) {
  Vue.component(`${PREFIX}${ListSwitch.name}`, ListSwitch)
}

export default ListSwitch
