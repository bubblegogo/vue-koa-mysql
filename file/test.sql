/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 08/10/2019 10:15:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `sort_id` int(10) unsigned DEFAULT '0' COMMENT '分类ID',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '文章标题',
  `description` varchar(255) DEFAULT '' COMMENT '文章描述',
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '文章内容',
  `passed` int(1) DEFAULT '0' COMMENT '审核状态',
  `filesrc` text COMMENT '文档所对应的 图片库',
  `create_time` timestamp NULL DEFAULT '2017-10-01 00:00:00' COMMENT '发表时间',
  `update_time` timestamp NOT NULL DEFAULT '2017-10-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `article_extend` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT '扩展信息',
  `status` char(1) NOT NULL DEFAULT '1' COMMENT '0 代表删除 1 代表正常',
  `typeid` varchar(255) DEFAULT NULL COMMENT '文章类型，目前有 vue react css javascript java linux node ….',
  PRIMARY KEY (`id`),
  KEY `sort_id` (`sort_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='文章数据库表';

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (1, 0, 1, 'vjvu', '', 'Vjvu yutq ymafjsjp crimmjl totuokkd demfexbi siewiw ullt nysqepu oqniupccmk dvchnh eowir nirujjr kxpyhtrcq qmuppfx.', 4365, '[{\"name\":\"food.jpeg\",\"url\":\"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100\",\"status\":\"finished\"},{\"name\":\"food2.jpeg\",\"url\":\"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100\",\"status\":\"finished\"}]', '2010-01-05 00:00:00', '2019-09-06 17:33:14', NULL, '1', 'vue');
INSERT INTO `article` VALUES (2, 0, 1, 'dx0', '', 'Dxolaqizvv haiqkhdnqx nvje xmu bbr ywache usnm lywqlxljt begnqfst bmij hwuvldex rye yyre.', 4045, '', '2010-01-05 00:00:00', '2019-09-06 17:33:15', NULL, '1', 'react');
INSERT INTO `article` VALUES (4, 0, 1, 'vugy', '', 'Vugy ixuqu uiwyj jdniqml awn cbkdtoe nxapvszkrv jpysjm vpdqn hpexyujc mitnldfoo cfci equgrwfni teqkxw jctpsus qavlvprmx ooniq atoyeciy vutgsiq pmmihhnjb.', 8000, '[{\"name\":\"food.jpeg\",\"url\":\"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100\",\"status\":\"finished\"},{\"name\":\"food2.jpeg\",\"url\":\"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100\",\"status\":\"finished\"}]', '1990-01-01 00:00:00', '2019-09-06 17:33:19', NULL, '1', NULL);
INSERT INTO `article` VALUES (5, 0, 1, 'test001', '', 'test001', 0, '[]', '2019-09-03 00:00:00', '2019-09-06 18:03:25', NULL, '0', 'vue');
INSERT INTO `article` VALUES (13, 0, 1, 'Test002', '', 'Test002', 0, '[{\"name\":\"question 2.txt\",\"url\":\"blob:http://localhost:8080/1971b7d6-daf3-40dc-b440-b19c759dc30b\"},{\"name\":\"testjava.txt\",\"url\":\"blob:http://localhost:8080/09a08495-1547-479d-9b4b-2d14753e7295\"}]', '2019-09-06 00:00:00', '2019-09-06 18:03:23', NULL, '0', 'vue');
INSERT INTO `article` VALUES (14, 0, 1, 'Test004', '', 'Test004', 0, '[{\"name\":\"testjava.txt\",\"url\":\"blob:http://localhost:8080/ee7acb2c-213b-43af-93ac-ef473d26343f\"}]', '2019-09-11 00:00:00', '2019-09-06 18:02:14', NULL, '0', 'vue');
INSERT INTO `article` VALUES (15, 0, 1, 'java 泛型', '详细解释java 泛型', '? extends T 指T类型或T的子类型  ? super T   指T类型或T的父类型，T和？运用的地方有点不同,?是定义在引用变量上,T是类上或方法上', 0, NULL, '2017-10-01 00:00:00', '2019-09-18 16:48:06', NULL, '1', 'java');
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `menu_id` int(10) NOT NULL,
  `menu_name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '0 代表 删除 1 代表正常',
  `key` varchar(255) DEFAULT NULL,
  `parent_id` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`menu_id`,`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` VALUES (0, 'Root', 0, NULL, -1);
INSERT INTO `menu` VALUES (1, 'Manager', 0, '/admin', 0);
INSERT INTO `menu` VALUES (2, 'Article', 0, '/Article', 0);
INSERT INTO `menu` VALUES (3, 'example', 0, '/example', 0);
INSERT INTO `menu` VALUES (9, '数据上传', 0, '/upload', 0);
INSERT INTO `menu` VALUES (11, 'Menu', 0, 'menumanager', 1);
INSERT INTO `menu` VALUES (12, 'User', 0, 'usermanager', 1);
INSERT INTO `menu` VALUES (21, 'ArticleList', 0, '/list', 2);
INSERT INTO `menu` VALUES (22, '图形分析', 0, 'area', 2);
INSERT INTO `menu` VALUES (31, 'table', 0, 'table', 3);
INSERT INTO `menu` VALUES (32, 'tree', 0, 'tree', 3);
COMMIT;

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu` (
  `role_id` int(10) NOT NULL,
  `menu_id` varchar(255) NOT NULL,
  `menu_name` varchar(255) DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
BEGIN;
INSERT INTO `role_menu` VALUES (1, '[0,1,11,12,2,21,22,3,31,32,9]', '超级管理员', 1);
INSERT INTO `role_menu` VALUES (2, '[2,21,22,3,31,32]', '普通用户2', 2);
INSERT INTO `role_menu` VALUES (3, '[3,31,32]', '普通用户3', 3);
COMMIT;

-- ----------------------------
-- Table structure for sort
-- ----------------------------
DROP TABLE IF EXISTS `sort`;
CREATE TABLE `sort` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `sort_name` char(50) NOT NULL DEFAULT '' COMMENT '分类名称',
  `parent_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '分类父ID',
  `sort_type` char(10) NOT NULL DEFAULT '' COMMENT '分类类别（可定制成新闻、文章、教程等）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章分类表';

-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '代办事项ID 自动递增',
  `user_id` int(11) NOT NULL COMMENT '创建用户的ID',
  `content` varchar(255) DEFAULT NULL COMMENT '代办事项内容',
  `create_time` datetime DEFAULT NULL COMMENT '创建代办事情时间',
  `status` tinyint(1) DEFAULT '1' COMMENT '0 代表删除 1 代表正常',
  `del_userid` int(11) DEFAULT NULL COMMENT '删除用户的ID ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of todo
-- ----------------------------
BEGIN;
INSERT INTO `todo` VALUES (1, 1, '     需要处理20个bug', '2019-09-16 11:00:13', 1, 1);
INSERT INTO `todo` VALUES (2, 2, '需要进行创建新的项目', '2019-09-17 11:00:44', 0, NULL);
INSERT INTO `todo` VALUES (3, 1, '   今天要修复100个bug success', '2019-09-13 15:00:45', 1, 1);
INSERT INTO `todo` VALUES (4, 1, '    今天要修复10个bug', '2019-09-13 15:00:45', 0, NULL);
INSERT INTO `todo` VALUES (5, 1, '     今天编写直线算法编程code', '2019-09-13 15:00:45', 0, NULL);
COMMIT;

-- ----------------------------
-- Table structure for upload
-- ----------------------------
DROP TABLE IF EXISTS `upload`;
CREATE TABLE `upload` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `file_name` char(100) NOT NULL DEFAULT '' COMMENT '文件名称',
  `file_path` char(200) NOT NULL DEFAULT '' COMMENT '文件路径',
  `mime_type` char(50) NOT NULL DEFAULT '' COMMENT '文件类型',
  `file_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '文件大小KB',
  `is_delete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `create_time` timestamp NULL DEFAULT '1990-01-01 00:00:00' COMMENT '上传时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='上传列表';

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` char(50) NOT NULL DEFAULT '' COMMENT '用户帐号',
  `pass_word` char(128) NOT NULL DEFAULT '' COMMENT '用户密码',
  `roles` tinyint(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户类型 0:未审核用户;1:超级管理员;2:普通管理员;3:VIP用户;4:普通用户',
  `user_email` char(128) NOT NULL DEFAULT '' COMMENT '邮箱地址',
  `create_time` timestamp NOT NULL DEFAULT '1990-01-01 00:00:00' COMMENT '注册时间',
  `login_ip` char(15) NOT NULL DEFAULT '' COMMENT '登录IP',
  `update_time` timestamp NOT NULL DEFAULT '1990-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '最后登录时间',
  `user_pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `token` varchar(255) NOT NULL,
  `user_extend` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT '扩展信息',
  `status` char(20) NOT NULL DEFAULT '1' COMMENT '0 代表注销用户，1代表正常使用，2 代表关闭用户',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='用户据库表';

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', 'admin', 1, 'dusaisai@qq.com', '2018-09-02 00:00:00', '127.0.0.1', '2019-09-27 17:41:38', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4iLCJpYXQiOjE1Njk1NzcyOTgsImV4cCI6MTU2OTU4MDg5OH0.7Uk8_BXIY1uYjZRhg8TJuLpb-UTpHia3bw6l4Gtwraw', NULL, '1');
INSERT INTO `user` VALUES (2, 'test', '123456', 2, '10000@qq.com', '2018-09-02 00:00:00', '127.0.0.1', '2019-09-27 17:41:32', '', ' ', NULL, '1');
INSERT INTO `user` VALUES (3, 'test01', '2356', 3, 'xxx@qq.com', '1990-01-01 00:00:00', '127.0.0.1', '2019-08-02 16:16:30', '', 'h8sx00cP33xwxHdIN1QF71zIQ3opy5FJHHr3rJAbWQbcCEGuY5ZlWsW7Jl2M', NULL, '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
