import { PREFIX } from '@config/config'
import Layout from './Layout'
import Header from './Header'
import Navbar from './Navbar'
import Scroller from './Scroller'
import StatusTag from './StatusTag'
// import ListSwitch from './ListSwitch'
// import SmoothLineChart from './SmoothLineChart'
// import FieldListInfo from './FieldListInfo'
// import Swipe from './Swipe'
// import SwipeItem from './SwipeItem'
// import Slide from './Slide'
// import LineChartAreaStack from './LineChartAreaStack'
// import PieDoughnut from './PieDoughnut'
// import PieLineChart from './PieLineChart'

// 存储组件列表
const components = {
  Layout,
  Header,
  Navbar,
  Scroller,
  StatusTag
  // ListSwitch,
  // SmoothLineChart,
  // FieldListInfo
  // Swipe,
  // SwipeItem,
  // Slide,
  // LineChartAreaStack,
  // PieDoughnut,
  // PieLineChart
}

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  install.installed = true
  // 遍历注册全局组件
  Object.keys(components).forEach(key => {
    Vue.component(`${PREFIX}${components[key].name}`, components[key])
  })
  // 下面这个写法也可以
  // components.map(component => Vue.use(component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components
}
