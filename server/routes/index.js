const router = require('koa-router')()

//checkToken作为中间件存在
const checkToken = require('../token/checkToken.js');
const User = require('../controllers/user.js');
const Type = require('../controllers/type.js');
const Article = require('../controllers/article.js');
const Front = require('../controllers/front.js')
const File = require('../controllers/file.js');

//使用 koa-body 代替 koa-bodyparser koa-multer
/*
const multer = require('koa-multer');//加载koa-multer模块
var path = require("path")
//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../uploads/'))
    },
    //修改文件名称
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
  })
  //加载配置
var upload = multer({ storage: storage });
//缩略图上传 由于 koa-route koa-router
router.post('/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file//返回文件名
  }
})
*/


//后台接口
//登录
router.post('/login',User.loginPost);

//获取单个用户信息
router.post('/user/get_info',User.getInfo)

//根据ID 获取用户信息
router.post('/user/get_info_byid',User.getInfoById)

//获取单个用户角色所对应的权限
router.post('/user/get_role_menu',User.getRoleMenu)

//获取用户列表
router.post('/user/get_user_list',User.getUserList)


// 删除用户
router.post('/user/delete_byid',User.deleteUser)

//退出
router.post('/user/logout',User.getLogOut)

//文章列表
router.post('/article/get_article_list',checkToken,Article.getArticleList)
//查找文章
router.post('/article/get_article',checkToken,Article.getArticle)
//添加文章
router.post('/article/save_article',checkToken,Article.createArticle)

//文件上传至 服务器
router.post('/file/upload',File.fileupload)


//添加栏目
router.post('/add_type',checkToken,Type.createType)
//查询所有栏目
router.post('/type_all',checkToken,Type.selectTypeAll)
//删除栏目
router.post('/del_type',checkToken,Type.delectTypeById);
//修改栏目
router.post('/edit_type',checkToken,Type.editTypeById);



//编辑文章
router.post('/edit_article',checkToken,Article.editArticle)
//文章状态
router.post('/update_state',checkToken,Article.updateState)
//文章删除
router.post('/del_article',checkToken,Article.delArticleById)



//推荐
router.post('/set_recommend',checkToken,Article.setRecommend)
//设置轮播
router.post('/set_slider',checkToken,Article.setSliderCon)


//前台接口
router.post('/type_all_front',Type.selectTypeAll)
//根据tid 查找相关文章
router.post('/type_article_list_front',Front.articleList)
//前4阅读
router.post('/get_for_article_front',Front.getMostConstuList)
//推荐文章
router.post('/get_recommend_front',Front.getRecommend)
//获取文章
router.post('/get_article_front',Front.findArticleById)
//修改阅读
router.post('/update_article_consult_front',Front.updateConsult)
//轮播查询
router.post('/select_slider_front',Front.selectSlider)
//首页文章列表
router.post('/home_list_front',Front.homeList)
//首页最新文章
router.post('/home_new_front',Front.newList)
//首页类型文章
router.post('/home_type_list_front',Front.getTypeList)
//搜索
router.post('/home_search_front',Front.searchArticleList)


module.exports = router
