const  Model = require('../lib/mysql.js');
const createToken = require('../token/createToken.js');
const moment = require('moment')

class LoggerController{

  static async addLogger(ctx){
    const { ip,user,url } = ctx.request.body;
    let time = moment().format('YYYY-MM-DD HH:mm');
    await Model.addlogger([ip,user,url,time])
      .then(res => {
        if(res){
          ctx.jsonReturn({
            code:200,
            message:"日志更新成功"
          })
        }else{
          ctx.jsonReturn({
            code:1,
            message:'日志更新失败'
          })
        }
      })
  }
}
module.exports = LoggerController;
