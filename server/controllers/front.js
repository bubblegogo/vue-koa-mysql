const  Model = require('../lib/mysql.js');
const moment = require('moment')
class FrontController{
    //文章添加
    static async articleList(ctx){
        //es6 解构
        //这里解构需要和 ctx.request.body 的对象属性相同
        const { tid,page } = ctx.request.body;
        let time = moment().format('YYYY-MM-DD HH:mm')
        if(!tid || isNaN(tid)){
            ctx.jsonReturn({
                code:1,
                message:'id err'
            })
        }
        if(!page || isNaN(page)){
            page = 1
        }

        await Model.selectArticleByTypeIdModel(tid,page)
            .then(res=>{
                var selectInfoRes = JSON.parse(JSON.stringify(res))
                if(selectInfoRes.length <= 0){
                    ctx.jsonReturn({
                        code:1,
                        message:'无数据'
                    })
                }else{
                   ctx.jsonReturn({
                       code:200,
                       data:{
                           list:selectInfoRes
                       },
                       message:'ok'
                   })

                }
            })
            .catch(err=>{
                ctx.jsonReturn({
                    code:1,
                    message:'添加失败,服务器异常'
                })
            })

    }
    //查询阅读数前4的文章
    static async getMostConstuList(ctx){
        const {pid} = ctx.request.body;
        if(!pid || isNaN(pid)){
            ctx.jsonReturn({
                code:1,
                message:'pid err'
            })
        }
        await Model.selectArticleByTypeHotModel(pid)
            .then(res=>{
                var selectInfoRes = JSON.parse(JSON.stringify(res))
                if(selectInfoRes.length <= 0){
                    ctx.jsonReturn({
                        code:200,
                        data:{
                            list:[]
                        },
                        message:'ok'
                    })
                }else{
                   ctx.jsonReturn({
                       code:200,
                       data:{
                           list:selectInfoRes
                       },
                       message:'ok'
                   })

                }
            })
    }
    static async getRecommend(ctx){
        const {pid} = ctx.request.body;
        await Model.getRecommendModel(pid)
        .then(res=>{
                var selectInfoRes = JSON.parse(JSON.stringify(res))
                if(selectInfoRes.length <= 0){
                    ctx.jsonReturn({
                        code:200,
                        data:{
                            list:[]
                        },
                        message:'ok'
                    })
                }else{
                   ctx.jsonReturn({
                       code:200,
                       data:{
                           list:selectInfoRes
                       },
                       message:'ok'
                   })

                }
            })
    }

    //查找文章
    static async findArticleById(ctx){
        const {id} = ctx.request.body;
        await Model.selectArticleByIdModel(id)
            .then(res=>{
                var selectInfoRes = JSON.parse(JSON.stringify(res))
                if(selectInfoRes.length <= 0){
                    ctx.jsonReturn({
                        code:200,
                        data:{
                            list:[]
                        },
                        message:'ok'
                    })
                }else{
                   ctx.jsonReturn({
                       code:200,
                       data:{
                           list:selectInfoRes
                       },
                       message:'ok'
                   })

                }
            })
    }
    static async updateConsult(ctx){
        const{id,consult} = ctx.request.body;

        if(!id || isNaN(id)){
            ctx.jsonReturn({
                code:1,
                message:'err'
            })
        }
        await Model.updateConsultModel([consult,id])
            .then(res=>{
                if(res){
                    ctx.jsonReturn({
                        code:200,
                        message:'ok'
                    })
                }else{
                    ctx.jsonReturn({
                        code:1,
                        message:'err'
                    })
                }
            })
    }
    //轮播查询
    static async selectSlider(ctx){
        await Model.selectSliderModel()
            .then(res=>{
                var selectInfoRes = JSON.parse(JSON.stringify(res))
                if(selectInfoRes.length <= 0){
                    ctx.jsonReturn({
                        code:200,
                        data:{
                            list:[]
                        },
                        message:'ok'
                    })
                }else{
                   ctx.jsonReturn({
                       code:200,
                       data:{
                           list:selectInfoRes
                       },
                       message:'ok'
                   })

                }
            })
    }

    static async homeList(ctx){
        const {page} = ctx.request.body;
        if(!page || isNaN(page)){
            page = 1
        }
        await Model.homeListModel(page)
            .then(res=>{
                var selectInfoRes = JSON.parse(JSON.stringify(res))
                if(selectInfoRes.length <= 0){
                    ctx.jsonReturn({
                        code:1,
                        message:'无数据'
                    })
                }else{
                   ctx.jsonReturn({
                       code:200,
                       data:{
                           list:selectInfoRes
                       },
                       message:'ok'
                   })

                }
            })
    }
    //最新文章
    static async newList(ctx){
        await Model.newArticleListModel()
            .then(res=>{
                var selectInfoRes = JSON.parse(JSON.stringify(res))
                if(selectInfoRes.length <= 0){
                    ctx.jsonReturn({
                        code:1,
                        message:'无数据'
                    })
                }else{
                   ctx.jsonReturn({
                       code:200,
                       data:{
                           list:selectInfoRes
                       },
                       message:'ok'
                   })

                }
            })
    }
    static async getTypeList(ctx){
       let typeListArr =  await Model.selectTypeAllModel()
            .then(typeRes=>{
                var typeList = JSON.parse(JSON.stringify(typeRes))
                return typeList
            })
       await Model.homeTypeListModel()
            .then(res=>{
                var selectInfoRes = JSON.parse(JSON.stringify(res))
                if(selectInfoRes.length <= 0){
                    ctx.jsonReturn({
                        code:200,
                        data:{
                            list:[]
                        },
                        message:'无数据'
                    })
                }else{
                    let newList = [];
                    typeListArr.forEach(type=>{
                        let itemArr = {type:type.type_name,list:[],typeid:type.id};
                        selectInfoRes.forEach(item=>{
                            if(type.id == item.typeid){
                                item['type_name'] = type.type_name
                                itemArr.list.push(item)
                            }
                        })
                        newList.push(itemArr)
                    })
                   ctx.jsonReturn({
                       code:200,
                       data:{
                           list:newList
                       },
                       message:'ok'
                   })

                }
            })
    }
    static async searchArticleList(ctx){
        const {page,title} = ctx.request.body;

        if(!page || isNaN(page)){
            ctx.jsonReturn({
                code:1,
                message:'err'
            })
        }
        await Model.searchArticleListModel(title,page)
            .then(res=>{
                var selectInfoRes = JSON.parse(JSON.stringify(res))
                if(selectInfoRes.length <= 0){
                    ctx.jsonReturn({
                        code:1,
                        message:'err2'
                    })
                }else{
                   ctx.jsonReturn({
                       code:200,
                       data:{
                           list:selectInfoRes
                       },
                       message:'ok'
                   })

                }
            })

    }


}
module.exports = FrontController;
