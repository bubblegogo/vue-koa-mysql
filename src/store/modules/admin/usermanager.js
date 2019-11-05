import { feachuserlist, feachuserById, deleteUserById } from '@/api/admin'
const usermanager = {
  state: {
    userlist: [],
    userdetail: {}
  },
  mutations: {
    SET_USER_LIST: (state, userlist) => {
      state.userlist = userlist
    },
    SET_USER_DETAIL: (state, userdetail) => {
      state.userdetail = userdetail
    }
  },

  actions: {
    FeachUserList({ commit, state, rootState, dispatch }) {
      return new Promise((resolve, reject) => {
        feachuserlist({ current_page: rootState.pages.pageobj.current_page, page_size: rootState.pages.pageobj.page_size }).then((reponse) => {
          dispatch('setTotalPage', reponse.data.page)
          commit('SET_USER_LIST', reponse.data.list)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).catch((e) => {})
    },
    FeachUserDetail({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        feachuserById(id).then((reponse) => {
          commit('SET_USER_DETAIL', reponse.data[0])
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).catch((e) => {})
    },
    DelUser({ dispatch, state }, params) {
      return new Promise((resolve, reject) => {
        deleteUserById(params).then((reponse) => {
          return dispatch('FeachUserList') // 获取更新后的用户列表信息
          // resolve()
        }).catch(error => {
          reject(error)
        })
      }).catch((e) => {})
    }

  }
}

export default usermanager
