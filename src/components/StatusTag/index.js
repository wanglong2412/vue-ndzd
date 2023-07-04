// 对外提供对组件的引用，注意组件必须声明 name
import StatusTag from './src/StatusTag.vue'
// 为组件提供 install 安装方法，供按需引入
StatusTag.install = Vue => {
  Vue.component(StatusTag.name, StatusTag)
}
export default StatusTag
