import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login' || to.path === '/') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          // note: roles must be a array! such as: ['1','2']

          /* const roles = res.data[0]
             store.dispatch('GenerateRoutes', { roles })
             */
          store.dispatch('GenerateRouteSide').then(() => { // 根据roles权限生成可访问的路由表
            const addRouters = store.getters.addRouters
            if (addRouters.length) {
              router.addRoutes(addRouters) // 动态添加可访问路由表
              const urlpath = []
              addRouters.forEach((k, v) => {
                const path = k.path
                if (k.children && k.children.length) {
                  k.children.forEach((ck, cv) => {
                    urlpath.push(path + '/' + ck.path)
                  })
                } else {
                  urlpath.push(path)
                }
              })
              if (urlpath.indexOf(to.path) === -1) {
                next() // 跳转到首页
                // next({ ...to,replace: true,path:urlpath[0]});//每次刷新的时候，都会指定到 path路径
              } else {
                next({ ...to, replace: true }) // 每次刷新的时候，是当前路径
              }
            } else {
              Message.error('请联系管理员进行分配权限')
              next({ path: '/404' })
            }
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
    // store.dispatch('SysLog') //新增记录日志
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
