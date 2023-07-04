import Vue from 'vue'
import Vuex from 'vuex'
import base from './modules/base'
import user from './modules/user'
import organization from './modules/organization'
import keepAlive from './modules/keepAlive'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    base,
    user,
    organization,
    keepAlive
  },
  getters
})

export default store
