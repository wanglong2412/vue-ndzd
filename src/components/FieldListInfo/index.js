// 对外提供对组件的引用，注意组件必须声明 name
import FieldListInfo from './src/FieldListInfo.vue'
// 为组件提供 install 安装方法，供按需引入
FieldListInfo.install = Vue => {
  Vue.component(FieldListInfo.name, FieldListInfo)
}
export default FieldListInfo
