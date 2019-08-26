import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import user from './modules/user'
import device from './modules/device'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    device
  },
  strict: process.env.NODE_ENV !== 'production'
})
