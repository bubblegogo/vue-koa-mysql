import { feachuserlist } from '@/api/admin'
const usermanager = {
  state: {
    userlist: []
  },
  mutations: {
    SET_USER_LIST: (state, userlist) => {
      state.userlist = userlist
    }
  },

  actions: {
    FeachUserList({ commit, state }) {
      return new Promise((resolve, reject) => {
        feachuserlist().then((reponse) => {
          commit('SET_USER_LIST', reponse.data.result)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default usermanager
