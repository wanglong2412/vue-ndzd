import * as types from './mutations_types'
import { cloneDeep } from 'lodash'
import { cancelAxiosText } from '@config/config'

export default {
  SetLoading: ({ commit }, isLoading) => {
    commit(types.SET_LOADING, isLoading)
  },
  CancelInfoPush({ commit, state }, data) {
    let cancelInfo = cloneDeep(state.cancelInfo)
    cancelInfo.push(data)
    commit(types.SET_CANCEL_INFO, cancelInfo)
  },
  CancelInfoPop({ commit, state }) {
    let cancelInfo = cloneDeep(state.cancelInfo)
    if (cancelInfo.length > 0) cancelInfo.pop().cancel(cancelAxiosText)
    commit(types.SET_CANCEL_INFO, cancelInfo)
  },
  CancelInfoSplice({ commit, state }, index) {
    let cancelInfo = cloneDeep(state.cancelInfo)
    if (cancelInfo.length > 0) cancelInfo.splice(index, 1)
    commit(types.SET_CANCEL_INFO, cancelInfo)
  }
}
