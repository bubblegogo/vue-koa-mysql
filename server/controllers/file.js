const moment = require('moment')
const fs = require('fs')
var path = require("path")
class FileController{

  // 根据用户ID 来更改用户状态
  static async fileupload(ctx){
    const file = ctx.request.files.file; // 获取上传文件
    const dir = path.join(__dirname, '../uploads/')
    FileController.mkdirFile(file,dir)
    if(file){
      ctx.jsonReturn({
        code:200,
        message:'success',
        data: file
      })
    }else{
        ctx.jsonReturn({
          code:1,
          message:'error'
        })
    }
  }





  /********************文件切片 以及断点文件传输 *************/

  /**
   * 上传文件验证
   * @param ctx
   * @returns {Promise<void>}
   */
  static async filecheck(ctx) {
    const {hash,ext} = ctx.request.body; // 获取上传文件

    const dir = path.join(__dirname, '../uploads') + `/${hash}`
    let uplodedList = [], uploaded = false
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir)
      for (let file of files) {
        if (file.name == (hash + "." + ext)) {
          uploaded = true
          break;
        }
        uplodedList.push(file)
      }
    }

    ctx.jsonReturn({
      code: 200,
      message: 'success',
      data: {uploaded, uplodedList}
    })

  }

  /**
   * 文件切片上传
   * @param ctx
   * @returns {Promise<void>}
   */
  static async filesliceupload(ctx){

    const file = ctx.request.files.file
    const { hash,name} = ctx.request.body; // 获取上传文件
    const dir = path.join(__dirname, '../uploads/breakfile') + `/${hash}`

    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    // 文件目录不存在的时候进行创建
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    let filePath = dir + `/${name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    if(file){
      ctx.jsonReturn({
        code:200,
        message:'success',
      })
    }else{
      ctx.jsonReturn({
        code:1,
        message:'error'
      })
    }
  }

  /**
   * 上传文件合并
   * @param ctx
   * @returns {Promise<void>}
   */
  static async filemerge(ctx) {

  }


  /**
   * 获取文件名和后缀
   * @param name
   * @returns {{name: *, ext: *}}
   */
  static getUploadFileInfo(name) {
    return  {title: name.replace(/\.\w+$/,'') , ext: name.replace(/.+\./,"")};
  }


  /**
   * @param file 上传文件
   * @param dir  上传文件的目录
   */
  static mkdirFile(file, dir){
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    // 文件目录不存在的时候进行创建
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    let filePath = dir + `/${file.name}`
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
}
module.exports = FileController;
