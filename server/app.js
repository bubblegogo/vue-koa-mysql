const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
//const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body') // 代替 koa-bodyparser
const logger = require('koa-logger')
const static = require("koa-static")

var path = require("path")
const fs = require('fs')
//返回数据中间件
const response = require('./middlewares/response.js')
const index = require('./routes/index')

// error handler
app.use(response)

onerror(app)

// middlewares
/*app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))*/

// 设置静态文件 调用
app.use(static(
  path.join(__dirname , '../dist')
))

// http://www.ptbird.cn/koa-body.html koa-body 代替 koa-bodyparser koa-multer
app.use(koaBody({
  multipart: true,
  formidable: {
    keepExtensions: true,    // 保持文件的后缀
    maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));

app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
