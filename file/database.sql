
-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (1, 0, 1, 'vjvu', '', 'Vjvu yutq ymafjsjp crimmjl totuokkd demfexbi siewiw ullt nysqepu oqniupccmk dvchnh eowir nirujjr kxpyhtrcq qmuppfx.', 4365, '[{\"name\":\"food.jpeg\",\"url\":\"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100\",\"status\":\"finished\"},{\"name\":\"food2.jpeg\",\"url\":\"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100\",\"status\":\"finished\"}]', '2010-01-05 00:00:00', '2019-09-06 17:33:14', NULL, '1', 'vue');
INSERT INTO `article` VALUES (2, 0, 1, 'dx0', '', 'Dxolaqizvv haiqkhdnqx nvje xmu bbr ywache usnm lywqlxljt begnqfst bmij hwuvldex rye yyre.', 4045, '', '2010-01-05 00:00:00', '2019-09-06 17:33:15', NULL, '1', 'react');
INSERT INTO `article` VALUES (4, 0, 1, 'Test upload File', '', 'Vugy ixuqu uiwyj jdniqml awn cbkdtoe nxapvszkrv jpysjm vpdqn hpexyujc mitnldfoo cfci equgrwfni teqkxw jctpsus qavlvprmx ooniq atoyeciy vutgsiq pmmihhnjb.', 8000, '[{\"name\":\"Test.txt\",\"url\":\"http://localhost:8080/server/uploads/upload_685ef8999349a57413ceb561617d178f.txt\"}]', '2020-04-03 00:00:00', '2020-04-03 18:28:00', NULL, '1', NULL);
INSERT INTO `article` VALUES (5, 0, 1, 'test001', '', 'test001', 0, '[]', '2019-09-03 00:00:00', '2019-09-06 18:03:25', NULL, '0', 'vue');
INSERT INTO `article` VALUES (13, 0, 1, 'Test002', '', 'Test002', 0, '[{\"name\":\"question 2.txt\",\"url\":\"blob:http://localhost:8080/1971b7d6-daf3-40dc-b440-b19c759dc30b\"},{\"name\":\"testjava.txt\",\"url\":\"blob:http://localhost:8080/09a08495-1547-479d-9b4b-2d14753e7295\"}]', '2019-09-06 00:00:00', '2019-09-06 18:03:23', NULL, '0', 'vue');
INSERT INTO `article` VALUES (14, 0, 1, 'Test004', '', 'Test004', 0, '[{\"name\":\"testjava.txt\",\"url\":\"blob:http://localhost:8080/ee7acb2c-213b-43af-93ac-ef473d26343f\"}]', '2019-09-11 00:00:00', '2019-09-06 18:02:14', NULL, '0', 'vue');
INSERT INTO `article` VALUES (15, 0, 1, 'java 泛型', '详细解释java 泛型', '? extends T 指T类型或T的子类型  ? super T   指T类型或T的父类型，T和？运用的地方有点不同,?是定义在引用变量上,T是类上或方法上', 0, NULL, '2017-10-01 00:00:00', '2019-09-18 16:48:06', NULL, '1', 'java');
INSERT INTO `article` VALUES (16, 0, 1, '文件热更新失败', 'vue组件热更新失败,是由于组件大小写名称不一致导致', '是因为找文件名称大小写有问题,导致热更新失败,我所遇到的就是组件文热更新失败,是因为组件名称大小写问题,页面引用的文件名保持一致', 0, NULL, '2019-12-03 00:00:00', '2019-12-03 10:55:00', NULL, '1', 'vue');
INSERT INTO `article` VALUES (17, 0, 1, 'vue scoped 穿透', 'vue scoped 穿透', '在Vue文件中的style标签上有一个特殊的属性，scoped。当一个style标签拥有scoped属性时候，它的css样式只能用于当前的Vue组件，可以使组件的样式不相互污染。如果一个项目的所有style标签都加上了scoped属性，相当于实现了样式的模块化.没有scoped 样式就是全局样式\n\neg : 在有scoped style中 样式\n<style scoped>\n  .style_link{ ... }\n</style> \n\n转译后: style_link 会有一个 data-v-hash 值\n  .style_link[data-v-4d624682]', 0, NULL, '2020-04-03 00:00:00', '2020-04-03 11:45:00', NULL, '1', 'vue');
COMMIT;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` VALUES (0, 'Root', 0, NULL, -1, 0, NULL, NULL);
INSERT INTO `menu` VALUES (1, 'Manager', 0, '/admin', 0, 0, 'Layout', '{ \"title\": \"Manager\", \"icon\": \"example\", \"role\": [1] }');
INSERT INTO `menu` VALUES (2, 'Article', 0, '/article', 0, 0, 'Layout', '{ \"title\": \"Article\", \"icon\": \"example\", \"role\": [2] }');
INSERT INTO `menu` VALUES (3, 'Example', 0, '/example', 0, 0, 'Layout', '{ \"title\": \"Example\", \"icon\": \"example\", \"role\": [3] }');
INSERT INTO `menu` VALUES (4, 'Chart', 0, '/echart', 0, 0, 'Layout', '{ \"title\": \"Chart\", \"icon\": \"example\", \"role\": [4] }');
INSERT INTO `menu` VALUES (9, 'Upload', 0, '/upload', 0, 0, 'Layout', '{ \"title\": \"Upload\", \"icon\": \"example\", \"role\": [9] }');
INSERT INTO `menu` VALUES (11, 'Menu', 0, 'menumanager', 1, 0, 'admin/sidemenu/index', '{ \"title\": \"Menu\", \"icon\": \"example\", \"role\": [11] }');
INSERT INTO `menu` VALUES (12, 'User', 0, 'usermanager', 1, 0, 'admin/usermanager/index', '{ \"title\": \"User\", \"icon\": \"example\", \"role\": [12] }');
INSERT INTO `menu` VALUES (13, 'EditUser', 0, 'edituser', 1, 1, 'admin/usermanager/edituser', '');
INSERT INTO `menu` VALUES (14, 'MenuManager', 0, 'menu', 1, 0, 'admin/sidemenu/menumanager', '{ \"title\": \"MenuManager\", \"icon\": \"example\" }');
INSERT INTO `menu` VALUES (21, 'ArticleList', 0, 'list', 2, 0, 'article/index', '{ \"title\": \"ArticleList\", \"icon\": \"table\", \"role\": [21] }');
INSERT INTO `menu` VALUES (22, 'EditArticle', 0, 'editArticle', 2, 1, 'article/editarticle', '');
INSERT INTO `menu` VALUES (31, 'table', 0, 'table', 3, 0, 'table/index', '{ \"title\": \"Table\", \"icon\": \"table\", \"role\": [31] }');
INSERT INTO `menu` VALUES (32, 'tree', 0, 'tree', 3, 0, 'tree/index', '{ \"title\": \"tree\", \"icon\": \"table\", \"role\": [32] }');
INSERT INTO `menu` VALUES (41, 'mixChart', 0, 'mixchart', 4, 0, 'chart/mixchart', '{ \"title\": \"mixChart\", \"icon\": \"example\", \"role\": [41] }');
INSERT INTO `menu` VALUES (42, 'lineChart', 0, 'linechart', 4, 0, 'chart/linechart', '{ \"title\": \"lineChart\", \"icon\": \"example\", \"role\": [42] }');
INSERT INTO `menu` VALUES (45, 'testView', 1, 'viewtest', 9, 1, 'chart/linechart', NULL);
INSERT INTO `menu` VALUES (74, 'viewChart', 0, 'viewchart', 9, 0, 'chart/linechart', '{\"title\":\"viewChart\",\"icon\":\"example\",\"role\":[74]}');
INSERT INTO `menu` VALUES (77, 'viewupload', 1, 'viewupload', 9, 1, 'chart/mixchart', '{\"title\":\"viewupload\",\"icon\":\"example\",\"role\":[77]}');
COMMIT;
SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
BEGIN;
INSERT INTO `role_menu` VALUES (1, '[0,1,11,12,13,14,2,21,22,3,31,32,4,41,42,9,74]', '超级管理员', 1);
INSERT INTO `role_menu` VALUES (2, '[2,21,22,3,31,32]', '普通用户2', 2);
INSERT INTO `role_menu` VALUES (3, '[3,31,32]', '普通用户3', 3);
COMMIT;


-- ----------------------------
-- Records of sys_log
-- ----------------------------
BEGIN;
INSERT INTO `sys_log` VALUES (604, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 15:44:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (605, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 15:46:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (606, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', '1', '2020-05-19 15:46:00', 'http://localhost:8080/#/article/list');
INSERT INTO `sys_log` VALUES (607, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', '1', '2020-05-19 15:46:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (608, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 15:48:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (609, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 15:49:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (610, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 15:49:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (612, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 16:01:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (613, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 16:04:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (614, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 16:17:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (615, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 16:17:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (616, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 16:38:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (617, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 16:50:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (618, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-19 17:03:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (619, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-20 10:06:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (620, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-20 10:16:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (621, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-20 10:16:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (622, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-20 15:13:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (623, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-20 15:14:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (624, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-20 15:17:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (625, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-20 16:48:00', 'http://localhost:8080/#/dashboard');
INSERT INTO `sys_log` VALUES (626, '{\"cip\": \"111.200.229.2\", \"cid\": \"110000\", \"cname\": \"北京市\"}', 'login', '2020-05-21 09:28:00', 'http://localhost:8080/#/dashboard');
COMMIT;

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
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', 'admin', 1, 'dusaisai@qq.com', '2018-09-02 00:00:00', '127.0.0.1', '2020-05-20 17:49:11', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4iLCJpYXQiOjE1ODk5NjgxNTEsImV4cCI6MTU4OTk3MTc1MX0.V2woiLhCg-btOrVaSvpoACEsnCUUn-Z_k0uFfJHk5ek', NULL, '1');
INSERT INTO `user` VALUES (2, 'test', '123456', 2, '10000@qq.com', '2018-09-02 00:00:00', '127.0.0.1', '2019-09-27 17:41:32', '', ' ', NULL, '1');
INSERT INTO `user` VALUES (3, 'test01', '2356', 3, 'xxx@qq.com', '1990-01-01 00:00:00', '127.0.0.1', '2019-08-02 16:16:30', '', 'h8sx00cP33xwxHdIN1QF71zIQ3opy5FJHHr3rJAbWQbcCEGuY5ZlWsW7Jl2M', NULL, '0');
COMMIT;
