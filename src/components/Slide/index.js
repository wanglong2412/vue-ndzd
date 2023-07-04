import { PREFIX } from '@config/config'
import Slide from './src/Slide'

Slide.name = 'Slide'

Slide.install = function(Vue) {
  Vue.component(`${PREFIX}${Slide.name}`, Slide)
}

export default Slide
