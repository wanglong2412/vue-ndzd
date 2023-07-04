import * as types from './mutations_types'
import { setStorage } from '@utils/storage.js'

export default {
  [types.SET_ORGANIZATION_LIST] (state, data) {
    state.organizationList = data
    setStorage('organization_list', state.organizationList)
  },
  [types.SET_ORGANIZATION_ID] (state, data) {
    state.organizationId = data
    setStorage('organization_id', state.organizationId)
  }
}
