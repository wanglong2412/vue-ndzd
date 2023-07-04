import * as types from './mutations_types'
import { setStorage } from '@utils/storage'

export default {
  [types.SET_TOKEN](state, token) {
    state.token = token
    setStorage('token', state.token)
  },
  [types.SET_USER_ID](state, userId) {
    state.userId = userId
    setStorage('user_id', state.userId)
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
    setStorage('user_info', state.userInfo)
  }
}
