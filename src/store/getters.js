const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  obj: state => state.user.obj,
  role_name: state => state.user.role_name,
  roles: state => state.user.roles, // 单个用户的角色
  userlist: state => state.usermanager.userlist, // 用户列表
  userdetail: state => state.usermanager.userdetail, // 单个用户信息

  menulist: state => state.sidemenu.menulist, // 菜单列表
  rolelist: state => state.sidemenu.rolelist, // 权限列表
  treemenu: state => state.sidemenu.treemenu, // 获取所有菜单树

  permission_routers: state => state.permission.routers, // 用户权限路由列表
  addRouters: state => state.permission.addRouters,
  articlelist: state => state.articlemanager.articlelist, // 文章列表
  articledetail: state => state.articlemanager.articledetail, // 文章列表

  pageobj: state => state.pages.pageobj, // 分页操作属性

  todolist: state => state.todo.todolist // 获取用户主页面的代办事项

}
export default getters
