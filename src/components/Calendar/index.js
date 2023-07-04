// 对外提供对组件的引用，注意组件必须声明 name
import Calendar from './src/Calendar'
// 为组件提供 install 安装方法，供按需引入
Calendar.install = Vue => {
  Vue.component(Calendar.name, Calendar)
}
export default Calendar
