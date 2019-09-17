const  Model = require('../lib/mysql.js');
const moment = require('moment')
class ToDoController{
  // 根据用户ID 来更改用户状态
  static async getTodoList(ctx) {
    const{ id } = ctx.request.body;
    await Model.selectAllTodo(id).then(res=>{
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
        message:'添加失败,服务器异常'
      })
    })
  }
  static async delTodoById(ctx) {
    const {id,status,user_id} = ctx.request.body
    await Model.delTodoById(id,status,user_id).then(res => {
      if(res){
        ctx.jsonReturn({
          code:200,
          message:'删除成功'
        })
      }else{
        ctx.jsonReturn({
          code:1,
          message:'删除失败'
        })
      }
    }).catch(err => {
      ctx.jsonReturn({
        code:1,
        message:'添加失败,服务器异常'
      })
    })
  }
  static async upTodoById(ctx) {
    const {id,content} = ctx.request.body
    await Model.upTodoById(id,content).then(res => {
      if(res){
        ctx.jsonReturn({
          code:200,
          message:'更新成功'
        })
      }else{
        ctx.jsonReturn({
          code:1,
          message:'删除失败'
        })
      }
    }).catch(err => {
      ctx.jsonReturn({
        code:1,
        message:'添加失败,服务器异常'
      })
    })
  }

}
module.exports = ToDoController;
