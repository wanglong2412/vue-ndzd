import noAvatar from '@assets/images/user/avatar.png'

const getters = {
  token: state => state.user.token,
  deptCode: state => state.user.userInfo.dept_code,
  networkId: state => state.user.userInfo.network_id,
  loginName: state => state.user.userInfo.login_name, // app登入名
  userName: state => { // 会员名称
    return state.user.userInfo.name || '无'
  },
  avatar: state => { // 头像
    return state.user.userInfo.avatar_url || noAvatar
    // return noAvatar
  },
  departmentName: state => { // 获取部门名称
    let department = state.user.userInfo.dept_name ? state.user.userInfo.dept_name.split('/') : []
    return department.length > 0 ? department[department.length - 1] : '无'
  },
  organizationId: state => state.organization.organizationId
}
export default getters
