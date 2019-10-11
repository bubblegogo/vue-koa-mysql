import { feachlist, updaterole } from '@/api/role'

const sidemenu = {

  state: {
    menulist: [],
    rolelist: [],
    treemenu: []
  },
  mutations: {
    SET_MENU_LIST: (state, menulist) => {
      state.menulist = menulist
    },
    SET_ROLE_LIST: (state, rolelist) => {
      state.rolelist = rolelist
    },
    SET_TREE_LIST: (state, treemenu) => {
      state.treemenu = treemenu
    }
  },
  actions: {
    // 树状结构迭代
    DataFormatTree({ commit, state, dispatch }, params) {
      let treeNode = []
      const treeIterator = (params, treeNode) => {
        if (!treeNode.length) {
          const root = params.filter(item => item.parent_id === -1)
          treeNode = JSON.parse(JSON.stringify(root))
        }
        for (let v = 0; v < params.length; v++) {
          const k = params[v]
          if (k.parent_id === -1) {
            params.splice(v, 1)
            v = v - 1
          } else {
            // findIndex 代替 some
            const findIndex = treeNode.findIndex(function(key, index) {
              return key.menu_id === k.parent_id
            })
            if (findIndex !== -1) {
              if (treeNode[findIndex].children === undefined) {
                treeNode[findIndex].children = []
              }
              treeNode[findIndex].children.push(JSON.parse(JSON.stringify(k)))
              params.splice(v, 1)
              v = v - 1
              treeIterator(params, treeNode[findIndex].children)
            }
          }
        }
        return treeNode
      }
      treeNode = treeIterator(params, treeNode)
      commit('SET_TREE_LIST', treeNode)
    },

    FeachList({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        feachlist().then((reponse) => {
          // reponse.data.menulist //树状结构迭代
          commit('SET_MENU_LIST', reponse.data.menulist)
          commit('SET_ROLE_LIST', reponse.data.rolelist.map(item => {
            item.menu_id = JSON.parse(item.menu_id)
            return item
          }))
          dispatch('DataFormatTree', reponse.data.menulist)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateRole({ commit, state }, param) {
      return new Promise((resolve, reject) => {
        updaterole(param).then((reponse) => {
          commit('SET_ROLE_LIST', reponse.data.map(item => {
            item.menu_id = JSON.parse(item.menu_id)
            return item
          }))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default sidemenu
