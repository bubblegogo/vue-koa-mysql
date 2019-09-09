const  Model = require('../lib/mysql.js');
const createToken = require('../token/createToken.js');

class UserController{
    //用户登录
    static async loginPost(ctx){
        //es6 解构
        //这里解构需要和 ctx.request.body 的对象属性相同
        const { username,password } = ctx.request.body;
       await Model.dologin(username,password)
            .then(result=>{

                var res = JSON.parse(JSON.stringify(result))
                if(res.length <= 0){
                  ctx.jsonReturn({
                      code:1,
                      message:'用户名或者密码错误'
                  })
                }else{
                    let token = createToken(username);
                    var updateinfo =  Model.updateUserToken([token,res[0]['id']])
                    if(updateinfo){
                          ctx.jsonReturn({
                              code:200,
                              data:{
                                  token:token,
                                  username:username
                              },
                              message:'登录成功'
                          })

                    }else{
                          ctx.jsonReturn({
                              code:1,
                              message:'登录失败'
                          })
                          }
                    }
                }).catch(err=>{
                        ctx.jsonReturn({
                            code:1,
                            message:'服务器异常'
                        })
                    })
    }



    static async getInfo(ctx){
     	const { token } = ctx.request.body;
        await Model.getinfo(token)
            .then(res=>{
                var resList = JSON.parse(JSON.stringify(res))
                if(resList.length == 0){
                    ctx.jsonReturn({
                        code:1,
                        data:{
                            list:[]
                        },
                        message:'err'
                    })
                }else{
                	ctx.jsonReturn({
                        code:200,
                        data:resList,
                    });
                }
            })
    }
    // 根据用户ID获取用户详情
    static async getInfoById(ctx){
      const { id } = ctx.request.body;
      await Model.getinfoById(id)
        .then(res=>{
          var resList = JSON.parse(JSON.stringify(res))
          if(resList.length == 0){
            ctx.jsonReturn({
              code:1,
              data:{
                list:[]
              },
              message:'err'
            })
          }else{
            ctx.jsonReturn({
              code:200,
              data:resList,
            });
          }
        })
    }

  // 根据用户ID 来更改用户状态
  static async deleteUser(ctx){
    const { id,status } = ctx.request.body;
    await Model.upuserstatus(id,status)
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



    /**
    * 根据roleid 返回对应的 menulist rolelist
    * ctx 请求条件
    * @turn 菜单 id
    */
     static async getRoleMenu(ctx){
        const { role } = ctx.request.body;
        if(role == undefined || role == ""){ //没有参数设置的时候获取所有的 角色 模块列表
            let rolelist = await Model.getallrolemenu()
                .then(res => {
                    return  res
                });
            await Model.getMenuNameById().then(menu =>{
                let mapval = {"rolelist":[],"menulist":[]};

                    rolelist.forEach((r,v)=>{
                        mapval.rolelist.push(r);
                    })
                    menu.forEach((m,v) => {
                        mapval.menulist.push(m);
                    })
                ctx.jsonReturn({
                    code:200,
                    data:JSON.parse(JSON.stringify(mapval))
                })
             })

        }else{

            await Model.getrolemenu(role)
                .then(res=>{
                    var res = JSON.parse(JSON.stringify(res));
                    if(res.length == 0){
                        ctx.jsonReturn({
                            code:1,
                            message:'改角色暂无分配权限，请联系管理员'
                        });
                  }else{
                        ctx.jsonReturn({
                            code:200,
                            data:JSON.parse(JSON.stringify(res[0])),
                       });

                   }
            })

        }

   }

  /* static async getRoleMenu(ctx){
        const { role } = ctx.request.body;
        await Model.getrolemenu(role)
            .then(res=>{

                var res = JSON.parse(JSON.stringify(res));
                if(res.length == 0){

                    ctx.jsonReturn({
                        code:1,
                        message:'改角色暂无分配权限，请联系管理员'
                    });
              }else{
                    let rolemenu = Model.getMenuNameById(res[0]['menu_id']);
                    return rolemenu;
               }

        })
        .then(rolemenu=>{
            ctx.jsonReturn({
                code:200,
                data:JSON.parse(JSON.stringify(rolemenu)),
           });
        })

   }
    */
    static async getUserList(ctx){
      const{ current_page=1, page_size=20 } = ctx.request.body;
      let page = {};
      await Model.getsumuser()
        .then(res => {
          var resList = JSON.parse(JSON.stringify(res))
          page = {
            current_page:current_page,
            page_size:page_size,
            total:resList.length,
          }
          if(resList.length > 0){
            let userlist = Model.getuserlist(current_page,page_size)
            return userlist
          }
        })
        .then(userlist=>{
            var resList = JSON.parse(JSON.stringify(userlist))
            if(resList.length == 0){
                ctx.jsonReturn({
                    code:1,
                    data:{
                        list:[],
                        page:page
                    },

                    message:'err'
                })
            }else{
              ctx.jsonReturn({
                    code:200,
                    data:{
                      list:resList,
                      page:page
                    },
                });
            }
        })
        .catch(err=>{
          ctx.jsonReturn({
            code:1,
            message:'用户列表暂无数据'
          })
        })
    }

    static async getLogOut(ctx){
    	const { token } = ctx.request.body;
        await Model.getlogout(token)
            .then(res=>{
                ctx.jsonReturn({
                    code:200,
                    message:'退出成功'
                })
            }).catch(err=>{
                ctx.jsonReturn({
                    code:1,
                    message:'删除失败，服务器异常'
                })
            })
    }

}

module.exports = UserController;
