import * as types from './mutations_types'
// import { setStorage } from '@utils/storage'

export default {
  [types.SET_CACHED_VIEW](state, view) {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  [types.DELETE_CACHED_VIEW](state, view) {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  }
}
