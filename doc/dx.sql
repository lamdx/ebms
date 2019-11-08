SET NAMES UTF8;
DROP DATABASE IF EXISTS dx;
CREATE DATABASE dx CHARSET=UTF8;
USE dx;
# 网站的基本信息
CREATE TABLE  jm_site_info(
  site_name VARCHAR(16),
  logo  VARCHAR(64),
  copyright VARCHAR(64)
);
INSERT INTO jm_site_info VALUES('嘉木','images/logo.png','Copyright © 2018.Company name All rights reserved.');
# 导航条目
CREATE TABLE jm_navbar(
  name VARCHAR(16),
  url  VARCHAR(64),
  title VARCHAR(32)
);
INSERT INTO jm_navbar VALUES('基本资料','index.html','1'),('收货信息','index.html','2'),('出货信息','index.html','3'),('仓库管理','index.html','4'),('配送管理','index.html','5'),('干线管理','index.html','6'),('系统管理','system.html','7')

# 轮播图
CREATE TABLE jm_carousel_item(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  pic VARCHAR(128),
  url VARCHAR(128),
  title VARCHAR(32)
);
INSERT INTO  jm_carousel_item VALUES(null,'images/1.png','/m1.html','清闲淡雅'),(null,'images/2.png','/m2.html','精湛工艺'),
(null,'images/3.png','/m3.html','南之嘉木');

# 商品列表
CREATE TABLE jm_new_product(
  pid INT NOT NULL,
  title VARCHAR(16),
  img VARCHAR(128),
  price DECIMAL(10,2)
);
INSERT INTO jm_new_product VALUES('1','银壶煮水壶','images/product/new_product_01.png','3800'),
('2','银质茶叶壶','images/product/new_product_02.png','3800'),
('3','手工银质茶承','images/product/new_product_03.png','1600'),
('4','玻璃茶碗','images/product/new_product_04.png','420'),
('5','茶夹','images/product/new_product_05.png','90'),
('6','日式银质茶托','images/product/new_product_06.png','2800');


# 用户列表
CREATE TABLE jm_user(
  uid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  empoloyee_id VARCHAR(16),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16) NOT NULL UNIQUE,
  avatar VARCHAR(128),
  user_name VARCHAR(32),
  gender INT
);
INSERT INTO jm_user VALUES(NULL, 'root', '123456', 'root@qq.com', '13501234567', 'images/avatar/default.png', '管理员', '0'),
(NULL, 'F3232816', '123456', '13512345678@qq.com', '13512345678', 'images/avatar/default.png', '张三', '0'),
(NULL, 'F3232472', '123456', '13501234568@qq.com', '13501234568', 'images/avatar/default.png', '李四', '1');
