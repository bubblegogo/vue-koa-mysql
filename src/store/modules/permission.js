import { asyncRouterMap, constantRouterMap } from '@/router'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
   
   
    return roles.some(role => route.meta.role.indexOf(Number(role)) >= 0)
    //return roles.some(role => route.meta.role == role )

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
            route.children =  filterAsyncRouter(route.children, roles)
        }
        return route
    }
    return false

  })

  return accessedRouters
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
        let accessedRouters,roles,user_role;
        

        //从 user.roles 中获取权限 this.state.user.roles

        //方法一 从外层 permission.js 中传入的 data   获取用户角色来进行 动态模块生成
        // user_role = data.roles.roles;

        //方法二 从 user GetInfo 中 根绝角色 来获取 模块权限id 来进行动态模块生成
        user_role = this.state.user.roles;


        if(user_role instanceof Array){
           roles = user_role;
        }else{
           roles = user_role.split(",");
        }
        

        accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        commit('SET_ROUTERS', accessedRouters);
        resolve();

      })


    } 
  }

}

export default permission
