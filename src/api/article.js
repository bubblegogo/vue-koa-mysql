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
// save or edit  article
export function saveoreditarticle(param) {
  if (param.id) {
    return request({
      url: '/article/edit_article',
      method: 'post',
      data: param
    })
  } else {
    return request({
      url: '/article/save_article',
      method: 'post',
      data: param
    })
  }
}
// delete articel
export function deleteArticleById(param) {
  return request({
    url: '/article/del_article',
    method: 'post',
    data: param

  })
}

