// require  AMD规范引入方式  运行时调用 是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量
// import  es6的一个语法标准 是编译时调用，所以必须放在文件开头  import是解构过程，引入的文件需要我们 export 才能调用

import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import locale from 'element-ui/lib/locale' // 兼容 element-ui 语言
import zh from './lang/zh'
import en from './lang/en'

import enLocale from 'element-ui/lib/locale/lang/en' // element ui 自带语言文件
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const messages = {
  en: {
    ...en,
    ...enLocale // 或者用 Object.assign(en, enLocale)
  },
  zh: {
    ...zh,
    ...zhLocale // 或者用 Object.assign(zh, zhLocale)
  }
}

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh', // 语言标识
  messages: messages
/* require 用法 使用，以及文件格式
 messages: {
    zh: require('./lang/zh.json'),
    en: require('./lang/en.json')
  }*/
})

// 按需加载里定制 i18n  详细查看 elementui 官网
// locale.i18n((key, value) => i18n.t(key, value))
export default i18n
