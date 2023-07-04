import { PREFIX } from '@config/config'
import Header from './src/Header'

Header.install = function(Vue) {
  Vue.component(`${PREFIX}${Header.name}`, Header)
}

export default Header
