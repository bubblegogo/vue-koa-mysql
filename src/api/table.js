import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/get_user_list',
    method: 'post'
  })
}
