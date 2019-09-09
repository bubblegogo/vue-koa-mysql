import request from '@/utils/request'

// feach role menu
export function feachlist() {
  return request({
    url: '/user/get_role_menu',
    method: 'post'
  })
}
// feach user list
export function feachuserlist(params) {
  return request({
    url: '/user/get_user_list',
    method: 'post',
    data: params
  })
}
// get a single user msg
export function feachuserById(id) {
  return request({
    url: '/user/get_info_byid',
    method: 'post',
    data: {
      id
    }
  })
}
// delete user by user id
export function deleteUserById(params) {
  return request({
    url: '/user/delete_byid',
    method: 'post',
    data: params
  })
}
