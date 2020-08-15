const  Model = require('../lib/mysql.js');
class NcpController{
  // 根据用户ID 来更改用户状态
  static async getHomeList(ctx) {

    const{ child_statistic ='国内'} = ctx.request.body;
    await Model.getHomeAllNcp(child_statistic).then(res=>{
      var resList = JSON.parse(JSON.stringify(res))
      ctx.jsonReturn({
        code:200,
        data:{
          list:resList
        },
        message:'ok'
      })
    }).catch(err=>{
      ctx.jsonReturn({
        code:1,
        message:'获取'+child_statistic+'数据 失败'
      })
    })
  }

  static async getCountryList(ctx) {
    const{ area = null } = ctx.request.body;

    await Model.getMaxTime().then(res => {
      var resJson = JSON.parse(JSON.stringify(res))

      return Model.getCountryAllNcp(resJson[0]["time"],area)
    })
    .then(res=>{
      var resList = JSON.parse(JSON.stringify(res))
      ctx.jsonReturn({
        code:200,
        data:{
          list:resList
        },
        message:'ok'
      })
    }).catch(err=>{
      ctx.jsonReturn({
        code:1,
        message:'获取最新 全国省和市数据失败 '
      })
    })
  }

}
module.exports = NcpController;
