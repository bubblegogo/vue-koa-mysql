const  Model = require('../lib/mysql.js');
const createToken = require('../token/createToken.js');
const moment = require('moment')
class TypeController{
    //用户登录
    static async createType(ctx){
        //es6 解构
        //这里解构需要和 ctx.request.body 的对象属性相同
        const { typeName } = ctx.request.body;
        let time = moment().format('YYYY-MM-DD HH:mm')
        if(!typeName){
            ctx.jsonReturn({
                code:1,
                message:'栏目不能为空'
            })
        }
        await Model.selectTypeModelByType(typeName)
       .then(seleInfo=>{
        var selectInfoRes = JSON.parse(JSON.stringify(seleInfo))

           if(selectInfoRes.length > 0){
                ctx.jsonReturn({
                    code:1,
                    message:'添加失败,该栏目已存在'
                })
           }else{
            let inserInfo = Model.addTypeModel([typeName,time])
            if(inserInfo){
                ctx.jsonReturn({
                    code:200,
                    message:'添加栏目成功'
                })
              }else{
                ctx.jsonReturn({
                    code:1,
                    message:'添加栏目失败'
                })
              }
           }
       }).catch(err=>{
                ctx.jsonReturn({
                    code:1,
                    message:'添加失败,服务器异常'
                })
            })
    }
    static async selectTypeAll(ctx){
        await Model.selectTypeAllModel()
        .then(res=>{
            var selectAllInfo = JSON.parse(JSON.stringify(res))
            if(selectAllInfo.length > 0){
                ctx.jsonReturn({
                    code:200,
                    data:{
                        list:selectAllInfo
                    },
                    message:'ok'
                })
            }else{
                ctx.jsonReturn({
                    code:1,
                    data:{
                        list:[]
                    },
                    message:'err'
                })
            }
        }).catch(err=>{
            ctx.jsonReturn({
                code:1,
                data:{
                    list:[]
                },
                message:err
            })
        })

    }
    static async delectTypeById (ctx){
        const {id} = ctx.request.body;
        if(!id || isNaN(id)){
            ctx.jsonReturn({
                code:1,
                data:[],
                message:'id err'
            })
        }else{
            await Model.delTypeByIdModel(id)
            .then(res=>{
                console.log( res );
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
            }).catch(err=>{
                    ctx.jsonReturn({
                        code:1,
                        message:'删除失败，服务器异常'
                    })
                })
        }
    }
    static async editTypeById(ctx){
        const { typeName,id } = ctx.request.body;
       if(!id || isNaN(id)){
            ctx.jsonReturn({
                code:1,
                message:'id err'
            })
       }
        let time = moment().format('YYYY-MM-DD HH:mm')
        await Model.editTypeByIdModel([typeName,time,id])
        .then(res=>{
            if(res){
                ctx.jsonReturn({
                    code:200,
                    message:'更新栏目成功'
                })
            }else{
                ctx.jsonReturn({
                    code:1,
                    message:'更新栏目失败'
                })
            }
        }).catch(err=>{
            ctx.jsonReturn({
                code:1,
                message:'服务异常，更新失败'
            })
        })
    }
}
module.exports = TypeController;
