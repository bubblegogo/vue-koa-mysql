import request from '@/utils/request'

// feach user list
export function feacharticlelist(param) {
  return request({
    url: '/article/get_article_list',
    method: 'post',
    data: param
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
// save article
export function savearticle(param) {
  return request({
    url: '/article/save_article',
    method: 'post',
    data: param
  })
}
// delete articel
export function deleteArticleById(param) {
  return request({
    url: '/article/del_article',
    method: 'post',
    data: param

  })
}

