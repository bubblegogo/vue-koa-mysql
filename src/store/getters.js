const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role_name: state => state.user.role_name,
  roles: state => state.user.roles,           //单个用户的角色
  
  userlist:state => state.usermanager.userlist,//用户列表
  menulist:state => state.sidemenu.menulist,   //菜单列表
  rolelist:state => state.sidemenu.rolelist,   //权限列表

  permission_routers: state => state.permission.routers, //用户权限路由列表
  addRouters: state => state.permission.addRouters,

}
export default getters
