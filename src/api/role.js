import request from '@/utils/request'

// feach role menu
export function feachlist() {
  return request({
    url: '/user/get_role_menu',
    method: 'post'
  })
}

// update role by role id
export function updaterole(params) {
  return request({
    url: '/user/role_update',
    method: 'post',
    data: params
  })
}
