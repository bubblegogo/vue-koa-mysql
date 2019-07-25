import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import sidemenu from './modules/admin/sidemenu'
import usermanager from './modules/admin/usermanager'
import logger from './logger'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    sidemenu,
    usermanager
  },
  logger,
  getters
})
export default store
