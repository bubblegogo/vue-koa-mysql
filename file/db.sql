/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 21/05/2020 16:16:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
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
  KEY `typeid` (`typeid`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='文章数据库表';

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `menu_id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 代表 正常 1 代表删除',
  `path` varchar(255) DEFAULT NULL,
  `parent_id` int(10) NOT NULL DEFAULT '0',
  `hidden` tinyint(1) NOT NULL DEFAULT '0' COMMENT '菜单 隐藏展示功能,默认展示',
  `component` varchar(255) DEFAULT NULL COMMENT '菜单 对应的view 页面',
  `meta` varchar(255) DEFAULT NULL COMMENT '菜单对应的属性值',
  PRIMARY KEY (`menu_id`,`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;


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
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL COMMENT '登录IP地址',
  `user` varchar(255) DEFAULT NULL COMMENT '登录用户名',
  `time` datetime DEFAULT NULL COMMENT '登录的时间戳',
  `url` varchar(255) DEFAULT NULL COMMENT '访问具体的URL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=627 DEFAULT CHARSET=utf8;

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

SET FOREIGN_KEY_CHECKS = 1;


-- 增加新型冠状病毒数据表
-- ----------------------------
-- Table structure for codv_acc_byday
-- ----------------------------
DROP TABLE IF EXISTS `codv_acc_byday`;
CREATE TABLE `codv_acc_byday` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day` varchar(50) NOT NULL COMMENT '当天时间',
  `sure_cnt` int(11) NOT NULL DEFAULT '0' COMMENT '累计确诊人数',
  `cure_cnt` int(11) NOT NULL DEFAULT '0' COMMENT '累计治愈总人数',
  `doubt_cnt` int(11) DEFAULT '0' COMMENT '现有疑似病例',
  `die_cnt` int(11) NOT NULL DEFAULT '0' COMMENT '累计死亡人数',
  `inc_sure` int(11) DEFAULT '0' COMMENT '当天新增病例',
  `inc_cure` int(11) DEFAULT '0' COMMENT '当天新增治愈',
  `inc_die` int(11) DEFAULT '0' COMMENT '当天新增死亡',
  `child_statistic` varchar(50) DEFAULT NULL COMMENT '具体国家详情',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_child_statistic` (`child_statistic`)
) ENGINE=InnoDB AUTO_INCREMENT=2238 DEFAULT CHARSET=utf8

-- ----------------------------
-- Table structure for codv_china_province
-- ----------------------------
CREATE TABLE `codv_china_province` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_confirm` int(11) DEFAULT NULL COMMENT '现有确诊人数',
  `total_confirmed` int(11) DEFAULT NULL COMMENT '累计确诊人数',
  `total_cured` int(11) DEFAULT NULL COMMENT '累计治愈人数',
  `total_death` int(11) DEFAULT NULL COMMENT '累计死亡人数',
  `child_statistic` varchar(50) DEFAULT NULL COMMENT '地区/国家名称',
  `time` varchar(50) DEFAULT NULL COMMENT '当前时间',
  `total_doubtful` int(11) DEFAULT NULL COMMENT '现有疑似病例',
  `total_increase` int(11) DEFAULT NULL COMMENT '本土新增人数',
  `parent_name` varchar(50) DEFAULT NULL COMMENT '上级名称',
  `last_inc_data` varchar(255) DEFAULT NULL COMMENT '与前一天数进行比较增值',
  `inc_province` varchar(255) DEFAULT NULL COMMENT '与last_inc_data 功能相似,有新增还是减少标识符',
  PRIMARY KEY (`id`),
  KEY `idx_time` (`time`(10))
) ENGINE=InnoDB AUTO_INCREMENT=24107 DEFAULT CHARSET=utf8


-- ----------------------------
-- Table structure for codv_country
-- ----------------------------
CREATE TABLE `codv_country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_confirm` int(11) DEFAULT NULL COMMENT '现有确诊人数',
  `total_confirmed` int(11) DEFAULT NULL COMMENT '累计确诊人数',
  `total_cured` int(11) DEFAULT NULL COMMENT '累计治愈人数',
  `total_death` int(11) DEFAULT NULL COMMENT '累计死亡人数',
  `child_statistic` varchar(50) DEFAULT NULL COMMENT '地区/国家名称',
  `time` varchar(50) DEFAULT NULL COMMENT '当前时间',
  `total_doubtful` int(11) DEFAULT NULL COMMENT '现有疑似病例',
  `total_increase` int(11) DEFAULT NULL COMMENT '本土新增人数',
  `iso_code` varchar(255) DEFAULT NULL COMMENT 'isoCode',
  `map_code` varchar(255) DEFAULT NULL COMMENT 'map_code',
  `parent_name` varchar(50) DEFAULT NULL COMMENT '上一级名称',
  `last_inc_data` varchar(255) DEFAULT NULL COMMENT '与昨日对比',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10341 DEFAULT CHARSET=utf8
