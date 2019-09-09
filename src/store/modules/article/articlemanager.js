import { feacharticlelist, feacharticledetail, savearticle, deleteArticleById } from '@/api/article'
const usermanager = {
  state: {
    articlelist: [],
    articledetail: {}
  },
  mutations: {
    SET_ARTICLE_LIST: (state, articlelist) => {
      state.articlelist = articlelist
    },
    SET_ARTICLE_DETAIL: (state, articledetail) => {
      state.articledetail = articledetail
    }
  },
  actions: {
    FeachArticleList({ commit, state, rootState, dispatch }) {
      return new Promise((resolve, reject) => {
        feacharticlelist({ id: rootState.user.obj.id, current_page: rootState.pages.pageobj.current_page, page_size: rootState.pages.pageobj.page_size }).then((reponse) => {
          dispatch('setTotalPage', reponse.data.page)
          commit('SET_ARTICLE_LIST', reponse.data.list)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    FeachArticleDetail({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        feacharticledetail(id).then((reponse) => {
          commit('SET_ARTICLE_DETAIL', reponse.data[0])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SaveArticel({ commit, state, dispatch }, param) {
      return new Promise((resolve, reject) => {
        savearticle(param).then((reponse) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    DelArticle({ dispatch, state, rootState }, param) {
      return new Promise((resolve, reject) => {
        deleteArticleById(param).then((reponse) => {
          dispatch('FeachArticleList') // 获取更新后的用户列表信息
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default usermanager
