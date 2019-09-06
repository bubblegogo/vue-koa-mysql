const moment = require('moment')
class FileController{
  // 根据用户ID 来更改用户状态
  static async fileupload(ctx){
    const filename = ctx.request.files.file; // 获取上传文件
    if(filename){
      ctx.jsonReturn({
        code:200,
        message:'success',
        data: filename
      })
    }else{
        ctx.jsonReturn({
          code:1,
          message:'error'
        })
    }
  }
}
module.exports = FileController;
