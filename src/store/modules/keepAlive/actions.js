import * as types from './mutations_types'

export default {
  AddCachedView({ commit }, view) {
    commit(types.SET_CACHED_VIEW, view)
  },
  DeleteCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit(types.DELETE_CACHED_VIEW, view)
      resolve([...state.cachedViews])
    })
  }
}
