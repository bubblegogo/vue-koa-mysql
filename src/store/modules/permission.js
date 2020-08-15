import { asyncRouterMap, constantRouterMap } from '@/router'
const _import = require('@/router/_import_' + process.env.NODE_ENV) // 获取组件的方法
import Layout from '../../views/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(Number(role)) >= 0)
    // return roles.some(role => route.meta.role == role )
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return route
    }
    return false
  })
  return accessedRouters
}

// 动态路由页面加载，组件导入
function asyncRouterLoader(asyncRouterMap) {
  const asyncRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.meta != '' && route.meta) route.meta = JSON.parse(route.meta)
      if (route.hidden) route.props = (route) => ({ id: route.query.id })
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = asyncRouterLoader(route.children)
    }
    return true
  })
  return asyncRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },

  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let roles
        // 从 user.roles 中获取权限 this.state.user.roles

        // 方法一 从外层 permission.js 中传入的 data   获取用户角色来进行 动态模块生成
        // user_role = data.roles.roles;

        // 方法二 从 user GetInfo 中 根绝角色 来获取 模块权限id 来进行动态模块生成
        const user_role = JSON.parse(this.state.user.roles) // 这里就是对应的 所有的模块功能
        if (user_role instanceof Array) {
          roles = user_role
        } else {
          roles = user_role.split(',')
        }
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },

    // 获取所有的菜单列表，与原来的路由（constantRouterMap）合一起
    GenerateRouteSide({ commit, state, dispatch }) {
      // 获取所有菜单选项
      return dispatch('FeachList').then(() => {
        let roles
        // 从 user.roles 中获取权限 this.state.user.roles 用于多角色处理
        // 方法一 从外层 permission.js 中传入的 data   获取用户角色来进行 动态模块生成
        // user_role = data.roles.roles;

        // 方法二 从 user GetInfo 中 根绝角色 来获取 模块权限id 来进行动态模块生成
        const user_role = JSON.parse(this.state.user.roles) // 这里就是对应的 所有的模块功能
        if (user_role instanceof Array) {
          roles = user_role
        } else {
          roles = user_role.split(',')
        }
        const sidemenu = JSON.stringify(this.state.sidemenu.treemenu[0].children)
        // 路由页面加载
        const routerMap = asyncRouterLoader(JSON.parse(sidemenu))
        const accessedRouters = filterAsyncRouter(routerMap, roles)
        commit('SET_ROUTERS', accessedRouters)
      })
    }
  }
}

export default permission
