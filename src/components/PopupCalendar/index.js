// 对外提供对组件的引用，注意组件必须声明 name
import PopupCalendar from './src/PopupCalendar'
// 为组件提供 install 安装方法，供按需引入
PopupCalendar.install = Vue => {
  Vue.component(PopupCalendar.name, PopupCalendar)
}
export default PopupCalendar
