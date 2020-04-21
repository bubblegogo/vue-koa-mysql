import Vue from 'vue'
import moment from "moment/moment";

/**
 * @param timestr 时间
 * @param cFormat 转换格式 默认 YYYY-MM-DD
 * @returns {string}
 */
Vue.filter('time_to_ymd', function (value) {
  return moment(value).format('YYYY-MM-DD')
})


// 内容过长进行隐藏
Vue.filter('hidden_content', function (content) {
  let str = ''
  if (content.length > 20) {
    str = content.substr(0, 20) + '...'
  } else {
    str = content
  }
  return str
})
