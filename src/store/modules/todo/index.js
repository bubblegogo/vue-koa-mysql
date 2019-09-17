import { feachtodolist, deltodobyid, uptodobyid } from '@/api/todo'

const todo = {
  state: {
    todolist: []
  },
  mutations: {
    SET_TODO_LIST: (state, todolist) => {
      state.todolist = todolist
    }
  },
  actions: {
    feachToDoList: ({ state, commit, rootState }) => {
      return new Promise((resolve, reject) => {
        feachtodolist({ id: rootState.user.obj.id }).then((reponse) => {
          commit('SET_TODO_LIST', reponse.data.list)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    delToDoById: ({ state, commit, rootState, dispatch }, params) => {
      return new Promise((resolve, reject) => {
        deltodobyid(params).then((reponse) => {
          dispatch('feachToDoList')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateToDoById: ({ state, commit, rootState, dispatch }, params) => {
      return new Promise((resolve, reject) => {
        uptodobyid(params).then((reponse) => {
          dispatch('feachToDoList')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

  }

}
export default todo
