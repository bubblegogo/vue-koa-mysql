import request from '@/utils/request'

// feach todo list
export function feachtodolist(params) {
  return request({
    url: '/todo/get_todo_list',
    method: 'post',
    data: params
  })
}
// del todo by todoid
export function deltodobyid(params) {
  return request({
    url: '/todo/del_todo_byid',
    method: 'post',
    data: params
  })
}

// update todo by todoid
export function uptodobyid(params) {
  return request({
    url: '/todo/up_todo_byid',
    method: 'post',
    data: params
  })
}

