import { login, logout, getInfo, getRoleMenu, sysLog, getIpAddress } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    token: getToken(),
    obj: {},
    avatar: '',
    roles: [],
    role_name: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_OBJ: (state, obj) => {
      state.obj = obj
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLE_NAME: (state, role_name) => {
      state.role_name = role_name
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data[0] // 验证返回的roles是否是一个非空数组

          commit('SET_OBJ', { 'name': data.user_name, 'id': data.id, 'ip': JSON.parse(data.ip), 'time': data.time })

          // 根据role角色 来
          if (data.roles !== undefined) {
            // get system menu by user role
            return getRoleMenu(data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          resolve(response)
        })
          .then(response => {
            commit('SET_ROLES', response.data.menu_id)
            commit('SET_ROLE_NAME', response.data.name)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    SysLog({ commit, state }) {
      const login_id = state.obj.id == null ? 'login' : state.obj.id
      return new Promise((resolve, reject) => {
        getIpAddress().then(res => {
          const regex = /\{(.+?)\}/g
          const str = "'" + res.trim() + "'"
          const options = str.match(regex)
          return sysLog(options[0], login_id, window.location.href)
        }).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
