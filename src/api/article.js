import request from '@/utils/request'

// feach user list
export function feacharticlelist() {
  return request({
    url: '/article/get_article_list',
    method: 'post'
  })
}
// feach article by id
export function feacharticledetail(id) {
  return request({
    url: '/article/get_article',
    method: 'post',
    data: {
      id
    }
  })
}

