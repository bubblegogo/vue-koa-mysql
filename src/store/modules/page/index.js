const pages = {
  state: {
    pageobj: {
      current_page: 1,
      page_sizes: [20, 50, 100],
      page_size: 20,
      total: 0
    }
  },
  mutations: {
    SET_CURRENT_PAGE: (state, current_page) => {
      state.pageobj.current_page = current_page
    },
    SET_PAGE_SIZE: (state, page_size) => {
      state.pageobj.page_size = page_size
    },
    SET_TOTAL: (state, total) => {
      state.pageobj.total = total
    }
  },
  actions: {
    setCurrentPage({ commit, state }, currentpage) {
      commit('SET_CURRENT_PAGE', currentpage)
    },
    setPageSize({ commit, state }, pagesize) {
      commit('SET_PAGE_SIZE', pagesize)
    },
    setTotalPage({ commit, state, dispatch }, pageobj) {
      commit('SET_TOTAL', pageobj.total)
    }
  }
}
export default pages
