import request from '@/utils/request'

/**
 * 默认获取中国大陆下 每天汇总 数据
 */
export function codvfeatchhome() {
  return request({
    url: '/codv/home/get_list',
    method: 'post'
  })
}

/**
 * 获取国家下省份下的数据
 */
export function codvfeatchcountry(params) {
  return request({
    url: '/codv/country/get_list',
    method: 'post',
    data: params
  })
}

