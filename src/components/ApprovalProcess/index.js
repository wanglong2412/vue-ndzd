// 对外提供对组件的引用，注意组件必须声明 name
import ApprovalProcess from './src/ApprovalProcess.vue'
// 为组件提供 install 安装方法，供按需引入
ApprovalProcess.install = Vue => {
  Vue.component(ApprovalProcess.name, ApprovalProcess)
}
export default ApprovalProcess
