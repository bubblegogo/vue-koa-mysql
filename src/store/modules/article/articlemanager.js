import { feacharticlelist, feacharticledetail } from '@/api/article'
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
    FeachArticleList({ commit, state }) {
      return new Promise((resolve, reject) => {
        feacharticlelist().then((reponse) => {
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
    }

  }
}

export default usermanager
