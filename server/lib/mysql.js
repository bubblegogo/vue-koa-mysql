var mysql = require('mysql');
var config = require('../config/index.js')
//定义pool池
var pool  = mysql.createPool({
    host     : config.dev.database.HOST,
    user     : config.dev.database.USERNAME,
    password : config.dev.database.PASSWORD,
    database : config.dev.database.DATABASE
  });

let query = function( sql, values ) {

      return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
          if (err) {
            resolve( err )
          } else {
            //先把 数值与 sql 进行组装
            sql = mysql.format(sql, values);

            console.log("mysql.js run sql",sql)
            // 新增把 TINY 类型的值 更改为 boolean 类型
            var options = {
              sql: sql,
              typeCast: function (field, next) {
                if (field.type == 'TINY' && field.length == 1) {
                  return (field.string() == '1'); // 1 = true, 0 = false
                }
                return next();
              }
            };

            connection.query(options, (err, rows) => {
              if ( err ) {
                reject( err )
              } else {
                resolve( rows )
              }
              //回收pool
              connection.release()
            })

          }
        })
      })

    }
    //登录查询用户
let dologin = function(username,password){
   	let _sql = `select * from user where user_name = "${username}" and pass_word = "${password}"`;
    return query(_sql)
}
//查询所有用户
let getsumuser = function(){
  let _sql = `select * from user`;
  return query(_sql)
}
let getuserlist = function(current_page,page_size){

    let page = pageObj(current_page,page_size)
   	let _sql = `select * from user limit ${page.st_num}, ${page.ed_num}`;

    return query(_sql)
}

let upuserstatus = function(id,status){
  let _sql =`update user set status = "${status}" where id = "${id}" `;
  return query(_sql)
}

//获取用户信息
let getinfo = function(value){
  let _sql = `select u.*,s.ip,s.time ,s.id as sysId from user u left JOIN sys_log s on u.id = s.user where u.id in ( select id from user where token = ? ) ORDER By s.time DESC LIMIT 1`;
 // let _sql = `select * from user where token = ?`;
    return query(_sql,value)
}
//根据用户id获取用户信息
let getinfoById = function(value){
  let _sql = `select * from user where id = ?`;
  return query(_sql,value)
}

//根据角色来获取列表菜单
let getrolemenu = function(value){
   	let _sql = `select * from role_menu where role_id = "${value}"`;
    return query(_sql)
}

//获取所有的角色以及列表菜单
let getallrole =function(){
  let _sql = `select * from role_menu`;
  return query(_sql)
}


//根据menudId 获取menu 或者 获取所有 menu
let getMenuNameById = function(value){
    let _sql = ''

    if(value){
        _sql =  `select menu_id as id ,menu_id,name,path,status,parent_id from menu where menu_id in (${value})`;
    }else{
        _sql =  `select m.menu_id as id ,m.* from menu m where m.status != 1 `;
    }
    return query(_sql)
}

let insertMenu = function (value) {
  let _sql = "insert into menu (menu_id,name,path,parent_id,hidden,component,meta) values (?,?,?,?,?,?,?)";
  return query(_sql,value)
}

let updatemenu = function(value,id){
  let  _sql = `update menu set meta = ${value} where menu_id = "${id}";`
  return query(_sql)
}
let deletemenu = function(id){
  let _sql = `update menu set status = 1 where menu_id = "${id}";`
  return query(_sql)
}

// 根据ID 更新 角色 权限
let updaterole= function(id,menuid){
  let _sql = `update role_menu set menu_id = "${menuid}" where id = "${id}";`
  return query(_sql)
}


//登录更新token
let updateUserToken = function(value){
  let _sql = `update user set token = ? where id = ?;`
  return query(_sql,value)
}

let getlogout= function(value){
  let _sql = `update user set token = " " where token = "${value}";`
  return query(_sql)
}

let pageObj = function(current_page,page_size){
  let st_num = (current_page-1)*page_size;
  let ed_num = current_page*page_size;
  return {"st_num":st_num,"ed_num":ed_num}
}

/********* article list api *********/

//获取所有文章
let selectAllArticle = function(id,typeid,search,current_page,page_size){
  let page = pageObj(current_page,page_size)

  let _sql = `select a.*,u.user_name from article a LEFT JOIN user u on a.user_id = u.id where a.status = 1 `;

  if(id != 1) { //id  = 1  为超级管理员
    _sql += `and a.user_id = "${id}" `
  }
  if(typeid != ''){
    _sql += `and a.typeid = "${typeid}" `
  }
  if(search != ''){
    _sql += `and a.title like "%${search}%" `
  }

  _sql += ` order by id desc  limit ${page.st_num}, ${page.ed_num} `
  return query(_sql)
}
let selectAllArt = function(id,current_page,page_size){
  let _sql = ''
  if(id == 1){
    _sql = `select * from article where status = 1 order by id desc `;
  }else{
    _sql = `select * from article where status = 1 and user_id = "${id}"  order by id desc `;
  }
  return query(_sql)
}

//根据id查找文章
let selectArticleById = function(id){
  let _sql = `select id,user_id,title,description,content,filesrc,\`status\`,typeid,date_format(create_time, '%Y-%m-%d') as create_time,date_format(update_time, '%Y-%m-%d') as update_timefrom from article where id = "${id}" `;
  return query(_sql);
}
//add article
let saveArticlModel = function(value){
  let _sql  = "insert into article (title,user_id,content,description,create_time,typeid,filesrc,update_time,status) values(?,?,?,?,?,?,?,?,?)"
  return query(_sql,value)
}
//modify article
let updateArticleModel = function(value){
  let _sql = "update article set typeid = ?,title = ?,content = ?,update_time = ?,create_time = ?,description = ?,filesrc = ? where id =?"
  return query(_sql,value)
}

//del article
let delArticleById = function(id,status){
  let _sql = `update article set status = "${status}" where id = "${id}"`;
  return query(_sql)
}


/******************获取待办事情*******************/

// feach todo list
let selectAllTodo = function(id){
  let _sql = `select id,user_id,status,content from todo where user_id = "${id}" order by id desc limit 20 `;
  return query(_sql);
}
// del todo by id
let delTodoById = function(id,status,user_id){
  let _sql = `update todo set status = "${status}" , del_userid = "${user_id}" where id = "${id}" `;
  return query(_sql)
}

let upTodoById = function(id,content){
  let _sql = `update todo set content = "${content}" where id = "${id}" `;
  return query(_sql)
}

let addlogger = function(value){
  let _sql  = "insert into sys_log (ip,user,url,time) values(?,?,?,?)";
  return query(_sql,value)
}

// 新冠状数据查询
let getHomeAllNcp = function(child_statistic){
  let _sql = `select * from codv_acc_byday where child_statistic = "${child_statistic}" `;
  return query(_sql);
}

let getMaxTime = function(){
  let _sql = `select max(time) as time from codv_china_province`;
  return query(_sql);
}

let getCountryAllNcp = function(time,area){

  let _sql = `select child_statistic,total_confirmed,inc_province,parent_name from codv_china_province where time = "${time}"  `;

  return query(_sql);
}



/*
//查询栏目下的文章是否存在
let selectTitleById = function(title,type){
  let _sql = `select * from article where title = "${title}" and typeid = "${type}" `;
  return query(_sql)
}
//添加栏目
let addTypeModel = function(value){
  let _sql = 'insert into types (type_name,time) values(?,?)'
  return query(_sql,value)
}
//根据栏目名称查询
let selectTypeModelByType = function(value){
  let _sql = `select * from types where type_name ="${value}" `;
  return query(_sql)
}


//删除栏目根据栏目id
let delTypeByIdModel = function(id){
  let _sql = `delete from types where id = "${id}"`;
  return query(_sql)
}
let editTypeByIdModel = function(value){
  let _sql = "update types set type_name = ?,time = ? where id = ?";
  return query(_sql,value)
}





//文章公开和禁止切换
let updateArticleStateModel = function(value){
  let _sql = "update article set is_public = ? where id = ?"
  return query(_sql,value)
}


//推荐文章
let articleRecommendModel = function(data){
  let _sql = "update article set recommend = ? where id = ?"
  return query(_sql,data)
}
//设置轮播
let setSliderModel = function(data){
  let _sql = "update article set is_slider = ? where id =?"
  return query(_sql,data)
}


//前台
let selectArticleByTypeIdModel = function(tid,page){
  let _sql = `select * from article where typeid = "${tid}" limit ${(page-1)*8},8;`
  return query(_sql);
}

//根据tid 查询热门文章
let selectArticleByTypeHotModel = function(id){
  let _sql = '';
  if(id){
    _sql = `SELECT * FROM article where typeid = "${id}" ORDER BY consult DESC limit 0,4`
  }else{
     _sql = `SELECT * FROM article  ORDER BY consult DESC limit 0,4`
  }
  return query(_sql)
}

//查找推荐文章一条
let getRecommendModel = function(id){
  let _sql = '';
  if(id){
     _sql = `SELECT * FROM article where typeid = "${id}" and recommend = 1 ORDER BY recommend DESC limit 0,1`
  }else{
    _sql = `SELECT * FROM article where  recommend = 1 ORDER BY recommend DESC limit 0,1`
  }
  return query(_sql)
}

let updateConsultModel = function(data){
  let _sql = 'update article set consult = ? where id = ?'
  return query(_sql,data)
}

//查询轮播
let selectSliderModel = function(){
  let _sql = `SELECT * FROM article where is_slider = 1 ORDER BY is_slider DESC limit 0,4`
  return query(_sql)
}
//首页列表(不包括 热门和轮播 )
let homeListModel = function(page){
  let _sql = `SELECT * FROM article where is_slider = 0 and recommend = 0 ORDER BY time DESC limit ${(page-1)*4},4;`
  return query(_sql)
}

//首页类型 (3条输出)
let homeTypeListModel = function(){
  let _sql = `SELECT * FROM article where is_public = 1 ORDER BY time DESC`;
  return query(_sql)
}

//首页最新文章
let newArticleListModel = function(){
  let _sql = `SELECT * FROM article where is_public = 1 ORDER BY time DESC limit 0,3`;
  return query(_sql)
}

//搜索
let searchArticleListModel = function(title,page){
  let _sql = `SELECT * FROM article where is_public = 1 and  title like "%${title}%" ORDER BY time DESC limit ${(page-1)*12},12`;
  return query(_sql)
}
*/










module.exports = {
    dologin,
    getinfo,
    getinfoById,
    upuserstatus,
    getrolemenu,
    getallrole,
    getMenuNameById,
    insertMenu,
    updatemenu,
    deletemenu,

    updaterole,
    getuserlist,
    getsumuser,
    updateUserToken,
    getlogout,

    selectAllArticle,
    selectAllArt,
    selectArticleById,
    saveArticlModel,
    delArticleById,
    updateArticleModel,

    // 获取代办事情列表
    selectAllTodo,
    delTodoById,
    upTodoById,

    // 新增日志记录
    addlogger,

    // 新冠状数据获取
    getHomeAllNcp,
    getMaxTime,
    getCountryAllNcp

    /*
    addTypeModel,
    selectTypeModelByType,

    delTypeByIdModel,
    editTypeByIdModel,
    selectTitleById,

    updateArticleStateModel,
    selectArticleByTypeIdModel,
    selectArticleByTypeHotModel,
    articleRecommendModel,
    getRecommendModel,
    updateConsultModel,
    setSliderModel,
    selectSliderModel,
    homeListModel,
    homeTypeListModel,
    newArticleListModel,
    searchArticleListModel*/

}
