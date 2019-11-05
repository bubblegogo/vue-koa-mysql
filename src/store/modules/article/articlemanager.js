import { feacharticlelist, feacharticledetail, saveoreditarticle, deleteArticleById } from '@/api/article'
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
    FeachArticleList({ commit, state, rootState, dispatch }, param) {
      return new Promise((resolve, reject) => {
        feacharticlelist(param).then((reponse) => {
          dispatch('setTotalPage', reponse.data.page)
          commit('SET_ARTICLE_LIST', reponse.data.list)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).catch((e) => {})
    },
    FeachArticleDetail({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        feacharticledetail(id).then((reponse) => {
          commit('SET_ARTICLE_DETAIL', reponse.data[0])
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).catch((e) => {})
    },
    SaveOrEditArticel({ commit, state, dispatch }, param) {
      return new Promise((resolve, reject) => {
        saveoreditarticle(param).then((reponse) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).catch((e) => {})
    },
    DelArticle({ dispatch, state, rootState }, param) {
      return new Promise((resolve, reject) => {
        deleteArticleById(param).then((reponse) => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).catch((e) => {})
    }

  }
}

export default usermanager
