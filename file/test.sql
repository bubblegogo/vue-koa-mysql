/*
Navicat MySQL Data Transfer

Source Server         : vue-koa-mysql
Source Server Version : 60011
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 60011
File Encoding         : 65001

Date: 2019-03-18 13:54:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`sort_id`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '分类ID' ,
`user_id`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID' ,
`title`  char(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文章标题' ,
`description`  char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文章描述' ,
`content`  text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '文章内容' ,
`passed`  int(1) NOT NULL DEFAULT 0 COMMENT '审核状态' ,
`read_type`  tinyint(4) NOT NULL DEFAULT 0 COMMENT '阅读权限（参阅用户类型）' ,
`create_time`  timestamp NULL DEFAULT '2017-10-01 00:00:00' COMMENT '发表时间' ,
`update_time`  timestamp NOT NULL DEFAULT '2017-10-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间' ,
`article_extend`  text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL COMMENT '扩展信息' ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='文章数据库表'
AUTO_INCREMENT=5;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('1', '0', '1', 'vjvu', '', 'Vjvu yutq ymafjsjp crimmjl totuokkd demfexbi siewiw ullt nysqepu oqniupccmk dvchnh eowir nirujjr kxpyhtrcq qmuppfx.', '4365', '0', '1990-01-01 00:00:00', '1990-01-01 00:00:00', null), ('2', '0', '1', 'dx0', '', 'Dxolaqizvv haiqkhdnqx nvje xmu bbr ywache usnm lywqlxljt begnqfst bmij hwuvldex rye yyre.', '4045', '0', '1990-01-01 00:00:00', '2018-08-20 11:08:46', null), ('3', '0', '1', 'tva', '', '	\r\nTva gyvxatyy dccmki gviiqtioo fhuoeqt tqoeqbiu fjmtfhqfmt gojsbz qwodpo seapwqffs nctoc wvdy uvuiprns geewcze vqmyzjc wpdbbtmki mkhiidyny tgcil pkororwt.', '1176', '0', '1990-01-01 00:00:00', '2018-08-20 11:09:04', null), ('4', '0', '1', 'vugy', '', 'Vugy ixuqu uiwyj jdniqml awn cbkdtoe nxapvszkrv jpysjm vpdqn hpexyujc mitnldfoo cfci equgrwfni teqkxw jctpsus qavlvprmx ooniq atoyeciy vutgsiq pmmihhnjb.', '8000', '0', '1990-01-01 00:00:00', '1990-01-01 00:00:00', null);
COMMIT;

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
`menu_id`  int(10) NOT NULL ,
`menu_name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`mtype`  tinyint(1) NULL DEFAULT NULL ,
`key`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`parent_id`  int(10) NOT NULL DEFAULT 0 ,
PRIMARY KEY (`menu_id`, `parent_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` VALUES ('0', 'Root', '1', null, '-1'), ('1', '品牌数据管理', '1', '/oobd', '0'), ('2', '销售数据详情', '1', '/sales', '0'), ('3', '网络数据详情', '1', '/network', '0'), ('4', 'TV数据详情', '1', '/tv', '0'), ('5', '户外数据详情', '1', '/outdoor', '0'), ('6', '公关数据详情', '1', '/public', '0'), ('7', 'MMM分析', '1', '/mmm', '0'), ('8', '我的报表', '1', '/report', '0'), ('9', '数据上传', '1', '/upload', '0'), ('21', '趋势分析', '1', 'trend', '2'), ('22', '地域分布', '1', 'area', '2'), ('31', '趋势分析', '1', 'trend', '3'), ('32', '地域分析', '1', 'area', '3'), ('41', '趋势分析', '1', 'trend', '4'), ('42', '地域分析', '1', 'area', '4'), ('51', '趋势分析', '1', 'trend', '5'), ('52', '地域分析', '1', 'area', '5'), ('61', '趋势分析', '1', 'trend', '6'), ('62', '地域分析', '1', 'area', '6'), ('71', '模型拟合', '1', 'model', '7'), ('72', '贡献分析', '1', 'contribution', '7'), ('73', 'ROI分析', '1', 'roi', '7');
COMMIT;

-- ----------------------------
-- Table structure for `role_menu`
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu` (
`role_id`  int(10) NOT NULL ,
`menu_id`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`menu_name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`id`  int(10) NOT NULL AUTO_INCREMENT ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=4

;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
BEGIN;
INSERT INTO `role_menu` VALUES ('1', '0,1,2,3,4,5,6,7,8,9', '超级管理员', '1'), ('2', '0,1,2,3,4', '普通用户', '2'), ('3', '0,1,2,3', '普通用户', '3');
COMMIT;

-- ----------------------------
-- Table structure for `sort`
-- ----------------------------
DROP TABLE IF EXISTS `sort`;
CREATE TABLE `sort` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`sort_name`  char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '分类名称' ,
`parent_id`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '分类父ID' ,
`sort_type`  char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '分类类别（可定制成新闻、文章、教程等）' ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='文章分类表'
AUTO_INCREMENT=1

;

-- ----------------------------
-- Records of sort
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `upload`
-- ----------------------------
DROP TABLE IF EXISTS `upload`;
CREATE TABLE `upload` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`user_id`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID' ,
`file_name`  char(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文件名称' ,
`file_path`  char(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文件路径' ,
`mime_type`  char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文件类型' ,
`file_size`  int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '文件大小KB' ,
`is_delete`  tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除' ,
`create_time`  timestamp NULL DEFAULT '1990-01-01 00:00:00' COMMENT '上传时间' ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='上传列表'
AUTO_INCREMENT=1

;

-- ----------------------------
-- Records of upload
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`id`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键' ,
`user_name`  char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户帐号' ,
`pass_word`  char(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户密码' ,
`roles`  tinyint(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户类型 0:未审核用户;1:超级管理员;2:普通管理员;3:VIP用户;4:普通用户' ,
`user_email`  char(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '邮箱地址' ,
`create_time`  timestamp NOT NULL DEFAULT '1990-01-01 00:00:00' COMMENT '注册时间' ,
`login_ip`  char(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '登录IP' ,
`update_time`  timestamp NOT NULL DEFAULT '1990-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '最后登录时间' ,
`user_pic`  varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '用户头像' ,
`token`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`user_extend`  text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL COMMENT '扩展信息' ,
`status`  char(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '0 代表注销用户，1代表正常使用，2 代表关闭用户' ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='用户据库表'
AUTO_INCREMENT=4

;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'admin', 'admin', '1', 'dusaisai@qq.com', '2018-09-02 00:00:00', '127.0.0.1', '2019-03-05 18:14:11', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4iLCJpYXQiOjE1NTE3ODA4NTEsImV4cCI6MTU1MTc4NDQ1MX0.JyQUTlsG2gS6V0VUdRIt6uYd6Zah0cVog0DgqvIKzA8', null, '1'), ('2', 'test', '123456', '2', '10000@qq.com', '2018-09-02 00:00:00', '127.0.0.1', '2019-03-04 16:06:03', '', 'vR4vdGmZkw3PoDUpk5ZauleZsHNRE0', null, '0'), ('3', 'test01', '2356', '3', 'xxx@qq.com', '1990-01-01 00:00:00', '127.0.0.1', '2019-03-04 16:06:37', '', 'h8sx00cP33xwxHdIN1QF71zIQ3opy5FJHHr3rJAbWQbcCEGuY5ZlWsW7Jl2M', null, '2');
COMMIT;

-- ----------------------------
-- Indexes structure for table article
-- ----------------------------
CREATE INDEX `sort_id` ON `article`(`sort_id`) USING BTREE ;
CREATE INDEX `user_id` ON `article`(`user_id`) USING BTREE ;

-- ----------------------------
-- Auto increment value for `article`
-- ----------------------------
ALTER TABLE `article` AUTO_INCREMENT=5;

-- ----------------------------
-- Auto increment value for `role_menu`
-- ----------------------------
ALTER TABLE `role_menu` AUTO_INCREMENT=4;

-- ----------------------------
-- Auto increment value for `sort`
-- ----------------------------
ALTER TABLE `sort` AUTO_INCREMENT=1;

-- ----------------------------
-- Indexes structure for table upload
-- ----------------------------
CREATE INDEX `user_id` ON `upload`(`user_id`) USING BTREE ;

-- ----------------------------
-- Auto increment value for `upload`
-- ----------------------------
ALTER TABLE `upload` AUTO_INCREMENT=1;

-- ----------------------------
-- Auto increment value for `user`
-- ----------------------------
ALTER TABLE `user` AUTO_INCREMENT=4;
