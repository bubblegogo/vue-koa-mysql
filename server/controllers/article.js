const  Model = require('../lib/mysql.js');
const moment = require('moment')
class ArticleController{
    //文章添加
    static async createArticle(ctx){
        //es6 解构
        //这里解构需要和 ctx.request.body 的对象属性相同
        const { title,content,id,typeid,filesrc,create_time } = ctx.request.body;

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
        await Model.saveArticlModel([title,id,content,create_time,typeid,filesrc,time,1])
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


        /*await Model.selectTypeAllModel()
            .then(res=>{
                var selectInfoRes = JSON.parse(JSON.stringify(res))
                if(selectInfoRes.length <= 0){
                    ctx.jsonReturn({
                        code:1,
                        message:'暂时无栏目，先添加栏目'
                    })
                }else{
                    var typeArr = [];
                    selectInfoRes.forEach(function(item){
                        typeArr.push(item.id)
                    });
                    function in_array(needle, haystack) {
                        for(var i in haystack) {
                         if(haystack[i] == needle) {
                          return true;
                         }
                        }
                        return false;
                    }
                    if(!in_array(type,typeArr)){
                        ctx.jsonReturn({
                            code:1,
                            message:'栏目id不合法'
                        })
                    }
                    let seleInfo =  Model.selectTitleById(title,type);
                    return seleInfo;
                }
            })
            .then(seleInfo=>{
                var seIn = JSON.parse(JSON.stringify(seleInfo))
                if(seIn.length){
                    ctx.jsonReturn({
                        code:1,
                        message:'该栏目下已存在此文章'
                    })
                }else{
                    let addRes = Model.saveArticlModel([type,title,tags,thumb,content,time])
                    if(addRes){
                        ctx.jsonReturn({
                            code:2,
                            message:'添加文章成功'
                        })
                    }else{
                        ctx.jsonReturn({
                            code:1,
                            message:'失败'
                        })
                    }
                }
            })
            .catch(err=>{
                ctx.jsonReturn({
                    code:1,
                    message:'添加失败,服务器异常'
                })
            })*/

    }
    static async getArticleList(ctx){
        const{ id,current_page=1,page_size=20 } = ctx.request.body;
        let total=0;
        await Model.selectAllArt(id)
          .then(res =>{
          var resList = JSON.parse(JSON.stringify(res))

          if(res.length ){
            total = res.length;
            let articleList = Model.selectAllArticle(id,current_page,page_size)
            return articleList
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
              message:'ok'
            })
        })
       .catch(err=>{
         ctx.jsonReturn({
           code:1,
           message:'添加失败,服务器异常'
         })
       })
    }
    static async getArticle(ctx){
        const{ id } = ctx.request.body;
        if(!id || isNaN(id)){
            ctx.jsonReturn({
                code:1,
                message:'id err'
            })
        }
        await Model.selectArticleById(id)
            .then(res=>{
                var resList = JSON.parse(JSON.stringify(res))
                if(resList.length){
                    ctx.jsonReturn({
                        code:200,
                        data:resList,
                        message:'ok'
                    })
                }else{
                    ctx.jsonReturn({
                        code:1,
                        message:'err'
                    })
                }

            }).catch(err=>{
                ctx.jsonReturn({
                    code:1,
                    message:'err'
                })
            })
    }
    static async editArticle(ctx){
        //es6 解构
        //这里解构需要和 ctx.request.body 的对象属性相同
        const { title,content,tags,type,id,thumb } = ctx.request.body;
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
        if(!type){
            ctx.jsonReturn({
                code:1,
                message:'类型不能为空'
            })
        }
        await Model.selectTypeAllModel()
        .then(res=>{
            var selectInfoRes = JSON.parse(JSON.stringify(res))
            if(selectInfoRes.length <= 0){
                ctx.jsonReturn({
                    code:1,
                    message:'暂时无栏目，先添加栏目'
                })
            }else{
                var typeArr = [];
                selectInfoRes.forEach(function(item){
                    typeArr.push(item.id)
                });
                function in_array(needle, haystack) {
                    for(var i in haystack) {
                     if(haystack[i] == needle) {
                      return true;
                     }
                    }
                    return false;
                }
                if(!in_array(type,typeArr)){
                    ctx.jsonReturn({
                        code:1,
                        message:'栏目id不合法'
                    })
                }
                let seleInfo =  Model.selectTitleById(title,type);
                return seleInfo;
            }
        })
        .then(seleInfo=>{
            var seIn = JSON.parse(JSON.stringify(seleInfo))
            if(seIn.length){
                ctx.jsonReturn({
                    code:1,
                    message:'改栏目下已存在此文章'
                })
            }else{
                let addRes = Model.updateArticleModel([type,title,tags,thumb,content,time,id])
                if(addRes){
                    ctx.jsonReturn({
                        code:2,
                        message:'修改文章成功'
                    })
                }else{
                    ctx.jsonReturn({
                        code:1,
                        message:'修改文章失败'
                    })
                }
            }
        })
        .catch(err=>{
            ctx.jsonReturn({
                code:1,
                message:'修改失败,服务器异常'
            })
        })


    }
    static  async updateState(ctx){
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
                        code:2,
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
                message:'id err'
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
                        code:2,
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
                    code:2,
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
