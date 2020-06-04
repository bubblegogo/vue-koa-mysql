// 开发环境导入组件
/**
 * require 是 CommonJS（和 AMD，想不到吧？）的模块导入方式，不支持模块的默认导出，因此导入的结果其实是一个含 default 属性的对象，所以需要调用default
 * ES6 的模块化导入导出 import 时需要给定一个变量名，所有 import 语句必须统一放在模块的开头
 * @param file
 * @returns {*}
 */
module.exports = file => require('@/views/' + file + '.vue').default
