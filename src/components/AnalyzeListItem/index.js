// 对外提供对组件的引用，注意组件必须声明 name
import AnalyzeListItem from './src/AnalyzeListItem.vue'
// 为组件提供 install 安装方法，供按需引入
AnalyzeListItem.install = Vue => {
  Vue.component(AnalyzeListItem.name, AnalyzeListItem)
}
export default AnalyzeListItem
