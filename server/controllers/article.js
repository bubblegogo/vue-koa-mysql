const  Model = require('../lib/mysql.js');
const moment = require('moment')
class ArticleController{
    //add article
    static async createArticle(ctx){
        //es6 解构
        //这里解构需要和 ctx.request.body 的对象属性相同
        const { title,content,description,user_id,typeid,filesrc,create_time,id=0} = ctx.request.body;
        let time = moment().format('YYYY-MM-DD HH:mm')

        if(!title){
            ctx.jsonReturn({
                code:1,
                message:'标题不能为空'
            })
        }
        if(!content){
            ctx.jsonReturn({
                code:1,
                message:'内容不能为空'
            })
        }
        if(!typeid){
            ctx.jsonReturn({
                code:1,
                message:'类型不能为空'
            })
        }
        await Model.saveArticlModel([title,user_id,content,description,create_time,typeid,filesrc,time,1])
          .then(res => {
            if(res){
              ctx.jsonReturn({
                code:200,
                message:'添加文章成功',
                data:id
              })
            }else{
              ctx.jsonReturn({
                code:1,
                message:'失败'
              })
            }
          })
    }
    // get page article list
    static async getArticleList(ctx){
        const { id,current_page=1,page_size=20,typeid="",search=""} = ctx.request.body;
        let total=0;
        await Model.selectAllArt(id)
          .then(res =>{
          var resList = JSON.parse(JSON.stringify(res))
          if(resList.length){
            total = resList.length;
            let articleList = Model.selectAllArticle(id,typeid,search,current_page,page_size)
            return articleList
          }else{
            ctx.jsonReturn({
              code:200,
              message:'暂无数据'
            })
          }
        })
        .then(articleList=>{
            var resList = JSON.parse(JSON.stringify(articleList))
            ctx.jsonReturn({
              code:200,
              data:{
                list:resList,
                page:{
                  current_page:current_page,
                  page_size:page_size,
                  total:total,
                }
              },
              message:'拉取数据成功'
            })
        })
       .catch(err=>{
         ctx.jsonReturn({
           code:1,
           message:'拉取数据失败,服务器异常'
         })
       })
    }
    // get article by id
    static async getArticle(ctx){
        const{ id } = ctx.request.body;
        if(!id || isNaN(id)){
            ctx.jsonReturn({
                code:1,
                message:'id error'
            })
        }
        await Model.selectArticleById(id)
            .then(res=>{
                var resList = JSON.parse(JSON.stringify(res))
                if(resList.length){
                    ctx.jsonReturn({
                        code:200,
                        data:resList,
                        message:'get message success'
                    })
                }else{
                    ctx.jsonReturn({
                        code:200,
                        message:'暂无数据'
                    })
                }
            }).catch(err=>{
                ctx.jsonReturn({
                    code:1,
                    message:'error'
                })
            })
    }
    // edit article
    static async editArticle(ctx){
        //这里解构需要和 ctx.request.body 的对象属性相同
        const { title,content,description,user_id,typeid,filesrc,create_time,id=0} = ctx.request.body;
        let time = moment().format('YYYY-MM-DD HH:mm')

        if(!title){
          ctx.jsonReturn({
            code:1,
            message:'标题不能为空'
          })
        }
        if(!content){
          ctx.jsonReturn({
            code:1,
            message:'内容不能为空'
          })
        }
        if(!typeid){
          ctx.jsonReturn({
            code:1,
            message:'类型不能为空'
          })
        }
        await Model.updateArticleModel([typeid,title,content,time,create_time,description,filesrc,id]).then(res=>{
          if(res){
            ctx.jsonReturn({
              code:200,
              message:'修改文章成功'
            })
          }else{
            ctx.jsonReturn({
              code:1,
              message:'修改文章失败'
            })
          }
        })
        .catch(err=>{
            ctx.jsonReturn({
                code:1,
                message:'修改失败,服务器异常'
            })
        })
    }
    static async updateState(ctx){
        const{state,id} = ctx.request.body;
        if(!state || !id){
            ctx.jsonReturn({
                code:1,
                message:'err'
            })
        }
        await Model.updateArticleStateModel([state,id])
            .then(res=>{
                if(res){
                    ctx.jsonReturn({
                        code:200,
                        message:'操作成功'
                    })
                }else{
                    ctx.jsonReturn({
                        code:1,
                        message:'操作失败'
                    })
                }
            }).catch(err=>{
                ctx.jsonReturn({
                    code:1,
                    message:'操作失败:'+err
                })
            })

    }
    static async delArticleById(ctx){
        const{ id,status } = ctx.request.body;
        if(!id || isNaN(id)){
            ctx.jsonReturn({
                code:1,
                message:'id error'
            })
        }
        await Model.delArticleById(id,status)
            .then(res=>{
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
            })
    }
   //推荐
   static async setRecommend(ctx){
        const { id,recommedid } = ctx.request.body;
        if(!id || isNaN(id)){
            ctx.jsonReturn({
                code:1,
                message:'id err'
            })
        }
        await Model.articleRecommendModel([recommedid,id])
            .then(res=>{
                if(res){
                    ctx.jsonReturn({
                        code:200,
                        message:'操作成功'
                    })
                }else{
                    ctx.jsonReturn({
                        code:1,
                        message:'操作失败'
                    })
                }
            })
   }
   static async setSliderCon(ctx){
    const { id,slider_state } = ctx.request.body;
    if(!id || isNaN(id)){
        ctx.jsonReturn({
            code:1,
            message:'id err'
        })
    }
    await Model.setSliderModel([slider_state,id])
        .then(res=>{
            if(res){
                ctx.jsonReturn({
                    code:200,
                    message:'操作成功'
                })
            }else{
                ctx.jsonReturn({
                    code:1,
                    message:'操作失败'
                })
            }
        })
   }
}
module.exports = ArticleController;
