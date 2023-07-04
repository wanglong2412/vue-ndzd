import * as types from './mutations_types'
// import { setStorage } from '@utils/storage'

export default {
  [types.SET_LOADING](state, isLoading) {
    state.isLoading = isLoading
  },
  [types.SET_CANCEL_INFO](state, data) {
    state.cancelInfo = data
  }
}
