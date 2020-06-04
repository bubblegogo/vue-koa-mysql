/**
 * 获取所有项目存在的vue 页面名称和路径
 * @returns {*}
 */
export function directoryVue() {
  const views = require.context('@/views', true, /\.vue/)
  const pathmap = views.keys().filter(item => {
    if (item.indexOf('layout') === -1) return true
  }).map(path => {
    return path.substring(2).replace('.vue', '').split('/')
  })

  let res = {}
  for (let i = 0; i < pathmap.length; i++) {
    dirLevel(pathmap[i], 0, res)
  }
  return objToTree(res)
}

/**
 * 字符串转换 层级对象
 * @param item
 * @param index
 * @param res
 * @returns {*}
 */
export function dirLevel(item, index, res) {
  const item_index = item[index]
  if (Object.keys(res).indexOf(item[index]) === -1) {
    res[item_index] = { 'label': item[index], 'value': item[index] }
  }
  index++
  if (item[index]) {
    if (res[item_index]['key'] == null) res[item_index]['key'] = {}
    dirLevel(item, index, res[item_index]['key'])
  }
  return res
}

/**
 * 层级对象转换 层级数组
 * @param obj
 * @returns {Array}
 */
export function objToTree(obj) {
  let tree = []
  const hidden = ['404', 'login', 'dashboard']
  Object.keys(obj).forEach(item => {
    const map = { 'label': obj[item]['label'], 'value': obj[item]['value'] }
    if (hidden.indexOf(map.label) !== -1) map.disabled = true

    if (obj[item]['key']) {
      if (map.children == null) map.children = []
      map.children = objToTree(obj[item]['key'])
    }
    tree.push(map)
  })
  return tree
}
