import { PREFIX } from '@config/config'
import Navbar from './src/Navbar'

Navbar.install = function(Vue) {
  Vue.component(`${PREFIX}${Navbar.name}`, Navbar)
}

export default Navbar
