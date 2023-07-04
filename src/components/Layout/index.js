import { PREFIX } from '@config/config'
import Layout from './src/Layout'

Layout.install = function(Vue) {
  Vue.component(`${PREFIX}${Layout.name}`, Layout)
}

export default Layout
