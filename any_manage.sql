/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : any_manage

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 18/05/2022 10:06:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '作者',
  `subtitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '副标题',
  `date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, 'Js中的防抖是什么', '<p><span style=\"color: rgb(48, 49, 51); background-color: rgb(255, 255, 255); font-size: medium; font-family: &quot;Microsoft YaHei&quot;;\">其实也是用来提升网页性能的一种技术写法&nbsp;防抖就是指当用户触发某个操作时，</span></p><p><span style=\"color: rgb(48, 49, 51); background-color: rgb(255, 255, 255); font-size: medium; font-family: &quot;Microsoft YaHei&quot;;\">如果在指定的时间内再次触发该操作，那么就清除前面触发的操作，直到用户操作之后并且在指定的时间内不再操作我们再处理用户的请求.</span></p><p><span style=\"color: rgb(48, 49, 51); background-color: rgb(255, 255, 255); font-size: medium; font-family: &quot;Microsoft YaHei&quot;;\">&nbsp;常见的场景：如用户在输入框输入内容，我们根据用户输入内容去查数据。&nbsp;当用户输入文字时，监听input事件，那么用户每输入一个字符都会触发查询，这样就会发起很多个请求2</span></p>', '普通用户', NULL, '2022-05-15 22:27:46');
INSERT INTO `article` VALUES (2, '第二篇文章', '斯大林睡大觉送达时间大奖赛大盘丝洞安排时间打盘', '普通用户', NULL, '2022-05-15 22:27:51');
INSERT INTO `article` VALUES (3, '我是第三个标题', '<p>我是第三篇文章</p>', '普通用户', NULL, '2022-05-15 22:27:54');
INSERT INTO `article` VALUES (35, '富文本', '<h1>新内容a</h1>', '普通用户', '富文本', '2022-05-18 00:00:00');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'token',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `role` int NULL DEFAULT NULL COMMENT '访问权限',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '123456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2NTI4MzYxODcsImV4cCI6MTY1Mjg1NDE4N30.y_XbKZyPk9zZlvTBhmhVQ7y8-Pk1DqFRPn7nnmqxsWA', 'blob:http://localhost:8080/e90cae78-5913-498f-ba0c-aaa0547716b7', '山西', '管理大大', 1);
INSERT INTO `user` VALUES (2, 'user', '123456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTY1MjgzNzQyOSwiZXhwIjoxNjUyODU1NDI5fQ.Qb9kuhbRswY1plQV41wDbBu-qMvwBPC7bW6mKTHx-00', 'blob:http://localhost:8080/c2784e4e-64f1-46b1-89d0-1a0cdf93ea2f', '山西', '普通用户', 1);
INSERT INTO `user` VALUES (3, 'test2', '123455', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwicGFzc3dvcmQiOiIxMjM0NTUiLCJpYXQiOjE2NTI1Mzk2ODcsImV4cCI6MTY1MjU1NzY4N30.x-QgPzQj4qYWJhNkifHmjI6a8Md7Gj_rqVpFD1-OxbE', 'avatar-180d2b06517.jpeg', '山西', '测试用户1', 1);
INSERT INTO `user` VALUES (4, '张三1', '123456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuW8oOS4iTEiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTY1MTE1NzQ4MiwiZXhwIjoxNjUxMTc1NDgyfQ.WTZoelNGWqnnLaKKWC8Ynb2SC9rNFONPuwLqRPazVMc', 'avatar-180d2b06517.jpeg', '山西', '张三', 1);
INSERT INTO `user` VALUES (6, 'admin1', '78456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjUxMzA1NDQwLCJleHAiOjE2NTEzMjM0NDB9.Zc-lm1iRJLySLY7c2rGhRgWauX3akPXBe3wrhnzMVPs', 'avatar-180d2b06517.jpeg', '山西', '哈哈', 1);
INSERT INTO `user` VALUES (7, 'ad12', 'zhansna', NULL, 'avatar-180d2b06517.jpeg', '山西', '测试555', 0);
INSERT INTO `user` VALUES (8, '王五1111', '1111', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IueOi-S6lDExMTEiLCJwYXNzd29yZCI6IjExMTEiLCJpYXQiOjE2NTI0NDUyNDYsImV4cCI6MTY1MjQ2MzI0Nn0.u4bieR3FqeDv9lC9lNG7vKtxpgloJ-X0i5d1E0JVRjg', 'avatar-180d2b06517.jpeg', '山西', '测试3', 0);
INSERT INTO `user` VALUES (9, '李琪琪', '123456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuadjueQqueQqiIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjUyNDQ1OTkyLCJleHAiOjE2NTI0NjM5OTJ9.X40zjhjUobKtZKUdqM53efSiMli8QDvr7GSxQQMAGHI', 'avatar-180d2b06517.jpeg', '山西', '我是李琪琪', 0);
INSERT INTO `user` VALUES (11, '我是李奇启', NULL, NULL, 'avatar-180d2b06517.jpeg', '山中', 'test546545', 0);
INSERT INTO `user` VALUES (12, '我是test3', NULL, NULL, 'avatar-180d2b06517.jpeg', '河北', 'test3', 0);
INSERT INTO `user` VALUES (13, '大叔大婶', NULL, NULL, 'avatar-180d2b06517.jpeg', '河南', '啊实打实', 0);
INSERT INTO `user` VALUES (14, '张三2', NULL, NULL, 'avatar-180d2b06517.jpeg', '山西', '张三', 0);
INSERT INTO `user` VALUES (15, '张三', '54321111', NULL, 'avatar-180d2b06517.jpeg', '枣庄', '123456', 0);
INSERT INTO `user` VALUES (16, '王五56', '11111', NULL, 'avatar-180d2b06517.jpeg', '山西', '王五', 0);
INSERT INTO `user` VALUES (17, '打算打算打', '9999999', NULL, 'avatar-180d2b06517.jpeg', '645646', '664564646', 1);
INSERT INTO `user` VALUES (36, '测试帐号', '123456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iua1i-ivleW4kOWPtyIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjUyODM5NDYxLCJleHAiOjE2NTI4NTc0NjF9.GtGdiNf_Pwt7GKNGxXalyWYMUTzQLJn2p65hakvxzkY', 'blob:http://localhost:8080/e62c75b9-0881-4be5-9b4d-c03da921d6bb', '', '测试帐号', 0);

SET FOREIGN_KEY_CHECKS = 1;
