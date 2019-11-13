# 技术难点

## 数据库

数据库 C:/Users/web/Desktop/DX/eb.sql

### 建表

```sql
SET NAMES UTF8;
DROP DATABASE IF EXISTS eb;
CREATE DATABASE eb CHARSET=UTF8;
USE eb;

# 导航条目
CREATE TABLE navbar_type(
  `tid` INT PRIMARY KEY AUTO_INCREMENT,
  `tname` VARCHAR(16),
  `turl`  VARCHAR(64)
);
INSERT INTO navbar_type VALUES(null,'基本资料','index.html'),
(null,'收货信息','index.html'),
(null,'出货信息','index.html'),
(null,'仓库管理','index.html'),
(null,'配送管理','index.html'),
(null,'干线管理','index.html'),
(null,'系统管理','system.html');

# 侧边栏目录
CREATE TABLE category(
  `cid` INT PRIMARY KEY AUTO_INCREMENT,
  `nname` VARCHAR(32),
  `nurl`  VARCHAR(64),
  `tid` INT,
  FOREIGN KEY(tid) REFERENCES navbar_type(tid)
);
INSERT INTO category VALUES(null,'新增特殊物流订单','orderAdd.html',6),
(null,'特殊物流订单审核','orderCheck.html',6),
(null,'特殊物流订单报表','orderList.html',6),
(null,'订单在途信息维护','orderUpdate.html',6),
(null,'修改密码','userUpdate.html',7),
(null,'发布公告','noticePost.html',7),
(null,'仓库资料管理','index.html',1),
(null,'承运商管理','index.html',1),
(null,'订单来源平台管理','index.html',1),
(null,'行政区域','index.html',1),
(null,'采购入库单管理','index.html',2),
(null,'退货入库单查询','index.html',2),
(null,'调拨订单查询','index.html',2),
(null,'ASN托运单列印','index.html',2),
(null,'销售订单查询','index.html',3),
(null,'订单监控报表','index.html',3),
(null,'换货出库单查询','index.html',3),
(null,'超卖报表查询','index.html',3),
(null,'入库单查询','index.html',4),
(null,'出库单查询','index.html',4),
(null,'仓库库存查询','index.html',4),
(null,'进出存总表','index.html',4),
(null,'配送订单查询','index.html',5),
(null,'配送订单追踪表','index.html',5),
(null,'配送信息导出','index.html',5),
(null,'签收单上传','index.html',5);

# 首页公告
CREATE TABLE notice(
  `nid` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(128),
  `publisher` VARCHAR(12),
  `date` DATETIME,
  `content` VARCHAR(256)
);
INSERT INTO notice VALUES(null,'test','管理员','2015-08-14 14:43:50','什么是响应式布局'),
(null,'行政区域规划','张三','2018-04-10 18:30:51','<h1>CSS即层叠样式表(Cascading StyleSheet)</h1>'),
(null,'项目流程审核','李四','2019-03-25 09:45:04','
CSS3圆角表格 CSS3圆角表格 圆角表格，对应属性：border-radius。');

# 用户列表
CREATE TABLE user(
  `uid` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `eid` VARCHAR(16),
  `pwd` VARCHAR(32),
  `email` VARCHAR(64),
  `phone` VARCHAR(16) NOT NULL UNIQUE,
  `avatar` VARCHAR(128) DEFAULT 'images/avatar/default.png',
  `user_name` VARCHAR(32),
  `gender` INT,
  `isDelete` INT(4) DEFAULT 0
);
INSERT INTO user VALUES(NULL, 'root', '123456', 'root@qq.com', '13501234567', DEFAULT, '管理员', '0', '0'),
(NULL, 'admin', '123456', '13512345678@qq.com', '13512345678', DEFAULT, '张三', '0', '0'),
(NULL, 'lam', '123456', '13501234568@qq.com', '13501234568', DEFAULT, '李四', '1', '0');

# 订单状态 1作废 2未审核 3已确认 4已发货 5已签收
CREATE TABLE order_status(
  `sid` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `order_status` VARCHAR(8)
);
INSERT INTO order_status VALUES(NULL, '作废'),(NULL, '未审核'),(NULL, '已确认'),(NULL, '已发货'),(NULL, '已签收');

# 承运商 1顺丰 2中通 3圆通 4申通 5韵达
CREATE TABLE fwd(
  `fid` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fwd` VARCHAR(8)
);
INSERT INTO fwd VALUES(NULL, '顺丰'),(NULL, '中通'),(NULL, '圆通'),(NULL, '申通'),(NULL, '韵达');

# 订单类型 1特殊物流订单 2上门取件
CREATE TABLE order_type(
  `tid` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `order_type` VARCHAR(8)
);
INSERT INTO order_type VALUES(NULL, '特殊物流订单'),(NULL, '上门取件');

# 订单列表
# foreign key([外键列]) references [主表(引用表)]([主键列])
# 外键含义：
# 如果公共关键字在一个关系中是主关键字，那么这个公共关键字被称为另一个关系的外键。由此可见，外键表示了两个关系之间的相关联系。以另一个关系的外键作主关键字的表被称为主表，具有此外键的表被称为主表的从表。外键又称作外关键字。
CREATE TABLE order_list(
  `oid` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `orderNo` VARCHAR(16),
  `orderTime` DATETIME,
  `orderType` INT(4) ,
  `sname` VARCHAR(16),
  `sphone` VARCHAR(16),
  `saddress` VARCHAR(128),
  `gname` VARCHAR(16),
  `gtype` VARCHAR(16),
  `gamount` INT(16),
  `gweight` DECIMAL(7,1),
  `gvolume` VARCHAR(128),
  `fwd` INT(4),
  `deliveryTime` DATETIME,
  `tNumber` VARCHAR(16),
  `rname` VARCHAR(16),
  `rphone` VARCHAR(16),
  `raddress` VARCHAR(128),
  `status` int(4) DEFAULT 0,
  FOREIGN KEY(orderType) REFERENCES order_type(tid),
  FOREIGN KEY(status) REFERENCES order_status(sid),
  FOREIGN KEY(fwd) REFERENCES fwd(fid)
);
INSERT INTO `order_list` VALUES (1, 'WS191025027', '2019-10-25 15:40:09', 1, '潘英豪', '15118598500', '广东省佛山市三水区云东海碧云路易库电商物流园E栋', '文件', '文件', 1, 1, '1*1*1', 5, '2019-07-02 00:00:00', '362320640156', '何福莲', '13556811930', '广东省深圳市龙华新区东环二路2号富士康科技集团南大门A01栋', 5);
INSERT INTO `order_list` VALUES (2, 'WS191025026', '2019-10-25 15:38:59', 1, '宗慧珍', '13589831220', '山东省烟台市经济技术开发区天津南路88号', '文件', '无', 0, NULL, NULL, 1, NULL, NULL, '顾传奇', '17642033725', '山东省潍坊市潍城区山东省潍坊潍城阿里巴巴仓', 3);
INSERT INTO `order_list` VALUES (3, 'WS191025025', '2019-10-25 15:36:03', 1, '宗慧珍', '13589831220', '山东省烟台市经济技术开发区天津南路88号', '文件', '无', 1, NULL, NULL, 2, NULL, NULL, '赵洪涛', '13589831220', '山东省济南市济阳县山东省济南市济阳区崔寨街道崔寨村驻地国道220西侧', 3);
INSERT INTO `order_list` VALUES (4, 'WS191025024', '2019-10-25 15:34:57', 1, '潘英豪', '15118598500', '广东省佛山市三水区云东海碧云路易库电商物流园E栋', '文件', '文件', 1, 1, '1*1*1', 3, '2019-07-02 00:00:00', '362320640208', '方雪莲', '17603055572', '广东省深圳市龙华新区东环二路1号龙华富士康南门A1栋', 5);
INSERT INTO `order_list` VALUES (5, 'WS191025023', '2019-10-25 15:33:05', 1, '宗慧珍', '13589831220', '山东省烟台市经济技术开发区天津南路88号', '文件', '无', 1, NULL, NULL, 4, NULL, NULL, '李玉满', '13589831220', '山东省青岛市李沧区山东省青岛市李沧区苍山路1号院内跨越速运', 3);
INSERT INTO `order_list` VALUES (6, 'WS191025022', '2019-10-25 15:17:17', 1, '潘英豪', '15118598500', '广东省佛山市三水区云东海碧云路易库电商物流库E栋', '文件', '1', 1, NULL, NULL, 5, NULL, NULL, '方雪莲', '17603055572', '广东省深圳市龙华新区东环二路龙华富士康南大门A1', 1);
INSERT INTO `order_list` VALUES (7, 'WS191025021', '2019-10-25 15:01:52', 1, '何燕红', '17610059912', '广东省深圳市龙华新区东环二路龙华富士康南大门A1', '文件', '1', 1, NULL, NULL, 5, NULL, NULL, '赵铁虎', '18909478856 1383', '甘肃省嘉峪关市长城区兰新东路1419-9（酒钢十号门东）', 3);
INSERT INTO `order_list` VALUES (8, 'WS191025020', '2019-10-25 15:01:52', 1, '何燕红', '17610059912', '广东省深圳市龙华新区东环二路龙华富士康南大门A1', '文件', '1', 1, NULL, NULL, 1, NULL, NULL, '沈志城', '13961888115', '江苏省无锡市梁溪区学前东路299号1210室', 3);
INSERT INTO `order_list` VALUES (9, 'WS191025019', '2019-10-25 15:01:52', 1, '何燕红', '17610059912', '广东省深圳市龙华新区东环二路龙华富士康南大门A1', '文件', '1', 1, NULL, NULL, 2, NULL, NULL, '郑勤富', '15061805333', '江苏省无锡市梁溪区兴源中路259号', 3);
```

- order_list
  基本信息
  主键 oid
  订单号 orderNo
  sender
  发货人姓名 sname
  发货人手机 sphone
  发货地址 saddress
  下单时间 orderTime
  receiving
  收货人姓名 rname
  收货人手机 rphone
  收货地址 raddress
  承运商 fwd
  商品信息 goods
  商品名称 gname
  商品数量 gamount
  商品类型 gtype
  物流信息
  打包重量 gweight
  打包体积 gvolume
  实际发货时间 deliveryTime
  运单号 Tracking Number
  订单状态 status
  签收时间 Signing time
  列
  oid
  orderNo
  orderTime
  orderType
  sname
  sphone
  saddress
  rname
  rphone
  raddress
  gname
  gtype
  gamount
  fwd
  gweight
  gvolume
  deliveryTime
  tNumber
  status

- order_status
  订单状态 1-作废 2-未审核 3-已确认 4-已发货 5-已签收
- fwd
  承运商 1 顺丰 2 中通 3 圆通 4 申通 5 韵达
- order_type
  订单类型 1 特殊物流订单 2 上门取件

### 搭建服务器

```js
/*
 * app.js 入口模块职责：
 * 	 创建服务
 * 	 做一些服务相关配置
 * 	 模板引擎
 * 	 body-parser 解析表单 post 请求体
 * 	 提供静态资源服务
 * 	 挂载路由
 * 	 监听端口启动服务
 */

// 引入express模块
const express = require("express");
const path = require("path");
// 引入body-parser中间件模块
const bodyParser = require("body-parser");
// 引入session中间件模块
const session = require("express-session");

// 引入用户路由器
const userRouter = require("./router/user/user");
const orderRouter = require("./router/order/order");
const backRouter = require("./router/router");

// 创建web服务器
let app = express();
// 监听端口
app.listen(80, function() {
  console.log(80);
});

// 尽可能早使用session中间件
app.use(
  session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: "keyboard cat",
    resave: false,
    // 默认值为true，即无论是否使用 Session ，都默认直接给你分配一把钥匙
    saveUninitialized: false
  })
);
app.use(function(req, res, next) {
  var url = req.originalUrl;
  // 没有session并且(是html文件或路径为/或路径为空)并且(路径不包含/userReg.html或/login.html)就跳转到登录页
  if (
    !req.session.user &&
    ((url.indexOf("/") > -1 && url.indexOf(".html") > -1) ||
      url == "/" ||
      url == "") &&
    url.indexOf("/userReg.html") == -1 &&
    url.indexOf("/login.html") == -1
  ) {
    return res.redirect("/login.html");
  }
  next();
});

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// 使用body-parser中间件 parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false //不使用第三方qs模块格式化为对象，而是使用querystring
  })
);

// parse application/json
app.use(bodyParser.json());

// 托管静态资源到public
app.use(express.static(path.join(__dirname, "./public/")));
app.use(
  "/node_modules/",
  express.static(path.join(__dirname, "./node_modules/"))
);

// 配置使用 art-template 模板引擎
// 第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
// 虽然这里不需要加载 art-template 但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template
app.engine("art", require("express-art-template"));
app.engine("html", require("express-art-template")); // 服务端渲染

// Express 为 Response 相应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中
// 如果想要修改默认的 views 目录，则可以
// app.set('views', render函数的默认路径)
app.set("views", path.join(__dirname, "./views/")); // 默认就是./views目录

// console.log(userRouter) 没有问题再挂载路由器
// 挂载路由器，并给URL添加前缀/user
// /user/reg
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use(backRouter);
```

```js
// 引入mysql模块
const mysql = require("mysql");

// 创建连接池对象
let pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "eb",
  connectionLimit: 10
});

// 导出连接池对象
module.exports = pool;
```

### 数据库接口设计

```js
const express = require("express");
// 引入连接池模块
const pool = require("../../pool");
// console.log(pool)

// 创建路由器对象
let router = express.Router();

// 添加路由
// 1.查询首页公告栏所有信息列表
router.get("/v1/noticelist", (req, res) => {
  let sql = "select * from notice";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 2.根据 id 查看具体的公告栏信息
router.get("/v1/notice/:id", (req, res) => {
  let $id = req.params.id;
  let sql = "select * from notice where id = ?";
  pool.query(sql, [$id], (err, result) => {
    if (err) throw err;
    // console.log(result);
    // 查询数据库得到的是对象数组
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.send("0");
    }
  });
});

// 3.导航栏
router.get("/v1/navbar_type", (req, res) => {
  let sql = "select * from navbar_type";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    // 返回当前登录信息用户
    // console.log(req.session.user);
    res.send({ user: req.session.user, nav: result });
  });
});

// 4.侧边栏目录
router.get("/v1/category/:tid", (req, res) => {
  let $tid = req.params.tid;
  let sql = "select * from category where tid = ?";
  pool.query(sql, [$tid], (err, result) => {
    // console.log(result);
    // 查询数据库得到的是对象数组
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("0");
    }
  });
});

// 5.查询所有订单列表信息
router.get("/v1/orderlist", (req, res) => {
  let sql = "select * from order_list";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 5.1根据订单号查询订单 WS191025027
router.get("/v1/orderno/:no", (req, res) => {
  let $no = req.params.no;
  let sql = "select * from order_list where orderNo = ?";
  pool.query(sql, [$no], (err, result) => {
    if (err) throw err;
    // console.log(result);
    // 查询数据库得到的是对象数组
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.send("0");
    }
  });
});
// 5.2根据订单状态查询订单 1页显示15条记录 不重要
router.get("/v1/orderstatus/:sid", (req, res) => {
  let $sid = req.params.sid;
  let sql =
    "select * from order_list where status = ? ORDER BY orderTime DESC LIMIT 0, 15";
  pool.query(sql, [$sid], (err, result) => {
    if (err) throw err;
    // console.log(result);
    // 查询数据库得到的是对象数组
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("0");
    }
  });
});
// 5.3根据订单类型查询订单 1页显示15条记录 不重要
router.get("/v1/ordertype/:tid", (req, res) => {
  let $tid = req.params.tid;
  let sql =
    "select * from order_list where orderType = ? ORDER BY orderTime DESC LIMIT 0, 15";
  pool.query(sql, [$tid], (err, result) => {
    if (err) throw err;
    // console.log(result);
    // 查询数据库得到的是对象数组
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("0");
    }
  });
});
// 5.4根据时间&类型&订单号&页数查询订单 1页显示5条记录 降序
// http://localhost/order/v1/ordertime/2019-10-23&2019-10-24&1&0
// WS191023023 PKS191023038
router.get("/v1/ordertime/:start&:end&:type&:no&:page", (req, res) => {
  let $start = req.params.start;
  let $end = req.params.end;
  let $type = req.params.type;
  let $no = req.params.no;
  let $page = req.params.page; // 转换成数值
  // 分页查询条件
  let $length = 5;
  let $skip = ($page - 1) * $length;
  // 初始化查询条件
  let $where = "";
  // 判断查询条件 SQL条件右边记得带上''
  if ($no != 0 && $type != 0) {
    $where = `orderTime > '${$start}' and orderTime < '${$end}' and orderType = ${$type} and orderNo = '${$no}'`;
  } else if ($no == 0 && $type != 0) {
    $where = `orderTime > '${$start}' and orderTime < '${$end}' and orderType = ${$type}`;
  } else if ($no != 0 && $type == 0) {
    $where = `orderTime > '${$start}' and orderTime < '${$end}' and orderNo = '${$no}'`;
  } else {
    $where = `orderTime > '${$start}' and orderTime < '${$end}'`;
  }
  // SQL语句
  let sql = `select * from order_list where ${$where} ORDER BY orderTime DESC limit ?, ?`;
  // 先查询到所有数据的数量
  let sql_total = `select count(1) as count from order_list where ${$where}`;

  /*pool.query(sql, [$skip, $length], (err, result) => {
    if (err) throw err;
    // console.log(result);
    // 查询数据库得到的是对象数组
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("0");
    }
  });*/

  // 封装 Promise
  let fetch_all = function(sql, arr = {}) {
    return new Promise(function(resolve, reject) {
      pool.query(sql, arr, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
  // 返回数据结构 {orderlist: Array(0), count: 0, total_pages: 0}
  let obj = {};
  fetch_all(sql, [$skip, $length])
    .then(function(data) {
      // 查询所有列表数据
      obj["orderlist"] = data;
      return fetch_all(sql_total);
    })
    .then(function(data) {
      // 先查询到所有数据的数量
      obj["count"] = data[0]["count"];
      // 计算总页数
      obj["total_pages"] = data[0]["count"] / $length;
      res.send(obj);
    });
});

// 6.根据订单号修改订单状态 put PKS191025020 2->3
// 1-作废 2-未审核 3-已确认 4-已发货 5-已签收
router.get("/v1/updatestatus/:no&:status", (req, res) => {
  let $no = req.params.no;
  let $status = req.params.status;
  let sql = "update order_list set status = ? where orderNo = ?";
  pool.query(sql, [$status, $no], (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.affectedRows > 0) {
      // 更改成功
      res.send("1");
    } else {
      res.send("0");
    }
  });
});

// 7.根据订单号上传订单信息 暂时没有写非空判断
router.put("/v1/updateorder", (req, res) => {
  // let $uid = req.body.uid;
  // let $email = req.body.email;
  // let $phone = req.body.phone;
  // let $user_name = req.body.user_name;
  // let $gender = req.body.gender;
  let obj = req.body;
  console.log(obj);
  let sql = "update order_list set ? where orderNo = ?;";
  pool.query(sql, [obj, obj.orderNo], (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.affectedRows > 0) {
      // 更改成功
      res.send("1");
    } else {
      res.send("0");
    }
  });
});

// 8.新增订单
router.post("/v1/orderadd", (req, res) => {
  let obj = req.body;
  console.log(obj);
  let sql = "insert into order_list set ? ";
  pool.query(sql, [obj], (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.affectedRows > 0) {
      res.send("1");
    } else {
      res.send("0");
    }
  });
});

// 查询所有订单类型
router.get("/v1/order_type", (req, res) => {
  let sql = "select * from order_type";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 查询所有承运商
router.get("/v1/fwd", (req, res) => {
  let sql = "select * from fwd";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 查询所有订单状态
router.get("/v1/order_status", (req, res) => {
  let sql = "select * from order_status";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// 导出路由器对象
module.exports = router;
```

## 页面功能

### 导航栏/侧边栏目录/路径导航联动

### common.js

- 渲染共同的页面内容
- 将接口返回的对象数组中的对象的属性名重新命名为 id & option 方便表单 select 的渲染

#### 显示当前登录用户

#### 给 art-template 注册过滤器

#### 格式化日期时间

yyyy-MM-dd hh:mm:ss Date.prototype.format

#### 退出功能

```js
$(function($) {
  // 初始化查询日期，设置为系统当前日期时间的前30天
  $("#tstart").val(
    new Date(new Date().setDate(new Date().getDate() - 30)).format("yyyy-MM-dd")
  );
  // 联动效果
  // http://localhost/userUpdate.html?tid=7&cid=25
  // 根据URL获取侧边栏目录中列表id以及顶部导航栏导航id
  // var $tid = window.location.search.replace("?tid=", "") || 1;
  var reg = /([a-z]+)=([0-9]+)/g;
  var temp = [];
  do {
    var arr = reg.exec(window.location.search);
    // console.log(arr);
    // ["tid=7", "tid", "7", index: 1, input: "?tid=7&cid=25", groups: undefined]
    // 如果arr不是null，才有必要输出
    arr != null && temp.push(arr[2]);
    // 否则如果arr是null，就什么也不干
  } while (arr != null); // 是循环可以继续的条件，不是退出的条件
  var $tid = temp[0] || 1;
  var $cid = temp[1];
  // console.log($cid);

  // 渲染侧边栏目录
  $.ajax({
    type: "get",
    url: "/order/v1/category/" + $tid,
    dataType: "json",
    success: function(data) {
      var res = template("tmpl_category", {
        category: data,
        cid: $cid
      });
      $(".list-group")
        .html(res)
        .fadeIn();
    }
  });
  // 渲染导航栏目录
  $.ajax({
    type: "get",
    url: "/order/v1/navbar_type",
    dataType: "json",
    success: function(data) {
      // console.log(data);
      var res = template("tmpl_nav", {
        nav: data.nav,
        tid: $tid
      });
      $(".navbar-nav")
        .html(res)
        .fadeIn();
      // 渲染当前用户
      $("#dropdownMenuLink").html(`当前用户：${data.user.user_name}`);
      // 如果有工号表单就设置其值且只读
      if ($("#eid")) {
        $("#eid")
          .attr("readonly", "readonly")
          .val(data.user.eid);
      }
    }
  });
  // 点击导航栏导航注册点击事件响应不同的侧边栏目录
  $(".navbar-nav").on("click", "li", function(event) {
    event.preventDefault();
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
    // 获取导航栏导航的自定义属性 data-tid
    var $tid = $(this)
      .children("a")
      .data("tid");
    // 获取导航栏导航文本
    var $text = $(this).text();
    // 分别设置侧边栏目录标题 路径导航
    $(".ad_aside .card-header h5").text($text);
    $(".breadcrumb .breadcrumb-item:eq(1) a").text($text);
    $.ajax({
      type: "get",
      url: "/order/v1/category/" + $tid,
      dataType: "json",
      success: function(data) {
        var res = template("tmpl_category", { category: data });
        $(".list-group")
          .html(res)
          .fadeIn();
      }
    });
  });
  // 点击侧边栏目录注册点击事件
  $(".ad_aside .card-header list-group").on("click", "li", function(event) {
    event.preventDefault();
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });

  // 给art-template注册过滤器 格式化时间日期
  template.defaults.imports.dateFormat = function(date, fmt) {
    date = new Date(date);
    var ret;
    var opt = {
      "y+": date.getFullYear().toString(), // 年
      "M+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "h+": date.getHours().toString(), // 时
      "m+": date.getMinutes().toString(), // 分
      "s+": date.getSeconds().toString() // 秒
    };
    for (var k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
    return fmt;
  };
  // 给art-template注册过滤器 格式化订单状态
  template.defaults.imports.statusFormat = function(status) {
    switch (status) {
      case 1:
        status = "作废";
        break;
      case 2:
        status = "未审核";
        break;
      case 3:
        status = "已确认";
        break;
      case 4:
        status = "已发货";
        break;
      case 5:
        status = "已签收";
        break;
    }
    return status;
  };

  // 格式化日期时间 yyyy-MM-dd hh:mm:ss
  Date.prototype.format = function(fmt) {
    var reg;
    var opt = {
      "y+": this.getFullYear().toString(), // 年
      "M+": (this.getMonth() + 1).toString(), // 月
      "d+": this.getDate().toString(), // 日
      "h+": this.getHours().toString(), // 时
      "m+": this.getMinutes().toString(), // 分
      "s+": this.getSeconds().toString(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds() //毫秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (var k in opt) {
      reg = new RegExp("(" + k + ")").exec(fmt);
      // 毫秒是占一位字符的
      if (reg) {
        // console.log(reg);
        // console.log(typeof reg[1]);
        // console.log(reg[1].length);
        // console.log(opt[k]);
        // reg[1].length == 1 ? opt[k] : opt[k].padStart(reg[1].length, "0");
        fmt = fmt.replace(
          reg[1],
          reg[1].length == 1 ? opt[k] : opt[k].padStart(reg[1].length, "0")
        );
      }
    }
    return fmt;
  };
  // var date = new Date();
  // dateFormat(date, "yyyy-MM-dd hh:mm:ss");

  // 每个页面都需要退出登录功能
  /*把html格式的字符串转出 js字符串拼接 数组拼接  
  http://tools.jb51.net/transcoding/html2js*/
  var modalHtml = [
    '  <div class="modal fade" id="logout" tabindex="-1">',
    '    <div class="modal-dialog" role="document">',
    '      <div class="modal-content">',
    '        <div class="modal-header">',
    '          <h5 class="modal-title" id="exampleModalLabel">温馨提示</h5>',
    '          <button type="button" class="close" data-dismiss="modal">',
    "            <span>&times;</span>",
    "          </button>",
    "        </div>",
    '        <div class="modal-body">',
    "          你确认要退出吗？",
    "        </div>",
    '        <div class="modal-footer">',
    '          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>',
    '          <button type="button" class="btn btn-primary">确定</button>',
    "        </div>",
    "      </div>",
    "    </div>",
    "  </div>"
  ].join("");
  $("body").append(modalHtml);
  $("[data-target='#logout']").on("click", function(e) {
    e.preventDefault();
    var $logout = $("#logout"); // 模态框组件对象
    // 点击模态框确定按钮，退出登录，清除session，并跳转到登录页
    $logout
      .modal("show")
      .find(".btn-primary")
      .on("click", function(e) {
        $logout.modal("hide");
        // 退出登录，清除session，并跳转到登录页
        EB.logout();
      });
  });

  window.EB = {};
  // 将接口返回的对象数组中的对象的属性名重新命名为 id & option 方便表单 select 的渲染
  EB.getOption = function(url, target) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = JSON.parse(xhr.responseText);
        // console.log(res);
        // 将对象的属性名重新命名为 id & option
        var arr = [];
        // 遍历对象数组
        res.forEach(function(item, i) {
          var obj = {};
          for (var key in item) {
            // 判断原对象属性名是否含有'id'
            // 若原对象属性名含有'id'，则将其值赋给新对象的obj.id
            // 若原对象属性名不含有'id'，则将其值赋给新对象的obj.option
            key.indexOf("id") != -1
              ? (obj.id = item[key])
              : (obj.option = item[key]);
          }
          arr.push(obj);
        });
        var str = "";
        for (var i = 0; i < arr.length; i++) {
          str += `<option value="${arr[i].id}" ${
            arr[i].id == 1 ? " selected" : ""
          }>${arr[i].option}</option>`;
        }
        target.innerHTML = str;
      }
    };
  };
  // 退出登录，清除session，并跳转到登录页
  EB.logout = function() {
    $.ajax({
      type: "get",
      url: "/user/v1/logout",
      dataType: "json",
      success: function(data) {
        if (data == 1) {
          location.href = "/login.html";
        }
      }
    });
  };
});
```

### 列表页

- 搜索条件 订单号 订单类型 时间 (订单状态) 搜索按钮
- 分页接口

```js
router.get("/v1/ordertime/:start&:end&:type&:no&:page", (req, res) => {
  let $start = req.params.start;
  let $end = req.params.end;
  let $type = req.params.type;
  let $no = req.params.no;
  let $page = req.params.page; // 转换成数值
  // 分页查询条件
  let $length = 5;
  let $skip = ($page - 1) * $length;
  // 初始化查询条件
  let $where = "";
  // 判断查询条件 SQL条件右边记得带上''
  if ($no != 0 && $type != 0) {
    $where = `orderTime > '${$start}' and orderTime < '${$end}' and orderType = ${$type} and orderNo = '${$no}'`;
  } else if ($no == 0 && $type != 0) {
    $where = `orderTime > '${$start}' and orderTime < '${$end}' and orderType = ${$type}`;
  } else if ($no != 0 && $type == 0) {
    $where = `orderTime > '${$start}' and orderTime < '${$end}' and orderNo = '${$no}'`;
  } else {
    $where = `orderTime > '${$start}' and orderTime < '${$end}'`;
  }
  // SQL语句
  let sql = `select * from order_list where ${$where} ORDER BY orderTime DESC limit ?, ?`;
  // 先查询到所有数据的数量
  let sql_total = `select count(1) as count from order_list where ${$where}`;

  /*pool.query(sql, [$skip, $length], (err, result) => {
    if (err) throw err;
    // console.log(result);
    // 查询数据库得到的是对象数组
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("0");
    }
  });*/

  // 封装 Promise
  let fetch_all = function(sql, arr = {}) {
    return new Promise(function(resolve, reject) {
      pool.query(sql, arr, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
  // 返回数据结构 {orderlist: Array(0), count: 0, total_pages: 0}
  let obj = {};
  fetch_all(sql, [$skip, $length])
    .then(function(data) {
      // 查询所有列表数据
      obj["orderlist"] = data;
      return fetch_all(sql_total);
    })
    .then(function(data) {
      // 先查询到所有数据的数量
      obj["count"] = data[0]["count"];
      // 计算总页数
      obj["total_pages"] = data[0]["count"] / $length;
      res.send(obj);
    });
});
```

- 客户端渲染分页 模板引擎渲染

```html
<ul class="pagination justify-content-end mr-4">
  <!-- todo -->
</ul>
<!-- art-template模板引擎  -->
<script src="/node_modules/art-template/lib/template-web.js"></script>
<!-- twbs-pagination分页插件 -->
<script src="/node_modules/twbs-pagination/jquery.twbsPagination.min.js"></script>
<script type="text/template" id="tmpl_list">
  {{each orderlist}}
    <tr>
      <th>{{$index+1}}</th>
      <td>{{$value.orderNo}}</td>
      <td>{{$value.sname}}</td>
      <td>{{$value.sphone}}</td>
      <td>{{$value.saddress}}</td>
      <td>{{$value.orderTime|dateFormat 'yyyy-MM-dd hh:mm:ss'}}</td>
      <td>{{$value.rname}}</td>
      <td>{{$value.rphone}}</td>
      <td>{{$value.raddress}}</td>
      <td>{{$value.fwd|fwdFormat}}</td>
      <td>{{$value.gname}}</td>
      <td>{{$value.gamount}}</td>
      <td>{{$value.gtype}}</td>
      <td>{{$value.gweight}}</td>
      <td>{{$value.gvolume}}</td>
      <td>{{$value.deliveryTime|dateFormat 'yyyy-MM-dd hh:mm:ss'}}</td>
      <td>{{$value.tNumber}}</td>
      <td>{{$value.status|statusFormat}}</td>
    </tr>
  {{/each}}
</script>
<script>
  // 当前页码
  var currentPage = 1;
  // 加载指定页数据
  function loadPage(page) {
    var $start = $("#tstart").val() || "2019-10-01";
    var $end = $("#tend").val() || "2019-12-31";
    var $orderType = $("#orderType").val();
    var $orderNo = $("#orderNo").val() || 0;
    // $("tbody").fadeOut();
    $.ajax({
      type: "get",
      // url: "/order/v1/ordertime/2019-10-23&2019-10-24&1&0&" + page,
      url: `/order/v1/ordertime/${$start}&${$end}&${$orderType}&${$orderNo}&${page}`,
      dataType: "json",
      success: function(data) {
        // 动态总页数 调用destroy方法，然后使用新选项初始化它 数据增加删除有可能影响页数
        $(".pagination").twbsPagination("destroy");
        // 分页组件
        $(".pagination").twbsPagination({
          // 渲染分页页面组件
          initiateStartPageClick: false, // 插件初始化时在起始页面上点击，数据增加删除后点击页码依然能保证是当前页而不是起始页
          first: "首页",
          last: "末页",
          prev: "上一页",
          next: "下一页",
          startPage: page,
          totalPages: Math.ceil(data.total_pages) || 1,
          visiblePages: 5,
          onPageClick: function(e, page) {
            // 点击分页页码才会执行这里的代码
            loadPage(page);
            currentPage = page;
          }
        });
        var res = template("tmpl_list", { orderlist: data.orderlist });
        $("tbody")
          .html(res)
          .fadeIn();
      }
    });
  }
  // loadPage(currentPage);
  $("form .btn").on("click", function(event) {
    event.preventDefault();
    // 每次搜索重新加载第1页
    loadPage(1);
  });
</script>
```

```js
window.page = 1;
/*1.默认第一页展示*/
var render = function() {
  getSecondCateData(function(data) {
    console.log(data);
    /*模板渲染*/
    $("tbody").html(template("list", data));
    /*初始化分页组件  根据数据*/
    /*2.分页展示*/
    $(".pagination").bootstrapPaginator({
      /*对应的bootstrap版本*/
      bootstrapMajorVersion: 3,
      /*分页按钮的大小 mini,small,normal,large*/
      size: "small",
      alignment: "center",
      /*当前页码*/
      currentPage: data.page,
      /*页码按钮的数量 默认是5*/
      numberOfPages: 3,
      /*一共多少页*/
      totalPages: Math.ceil(data.total / data.size),
      /*点击页码渲染*/
      /*监听按钮的点击事件 获取点击的时候的页码*/
      onPageClicked: function(event, originalEvent, type, page) {
        /*1. event jquery的事件对象*/
        /*2. originalEvent 原生dom的事件对象*/
        /*3. type 按钮的类型 */
        /*4. 按钮对应的页码*/
        window.page = page;
        render();
      }
    });
  });
};
render();
```

### 随机订单号生成

生成新订单前，先从服务端获取最新的单号(异步的)

```js
// 生成订单号
var getOrder = function() {
  return new Promise((resolve, reject) => {
    // WS191023023 PKS191023038
    // 获取订单类型和订单号
    var type = $("#orderType").val() ? $("#orderType").val() : 0;
    // console.log(type);
    // var no = orderNo.value ? orderNo.value : 0;
    var no = 0;
    // console.log(no);
    var page = 1;
    // var d1 = new Date("2019-10-23");
    // 将日期格式中的 / 改为 -
    var d1 = new Date().toLocaleDateString().replace(/\//g, "-");
    var d2 = new Date(d1);
    // 原日期加上1天
    d2.setDate(d2.getDate() + 1);
    d2 = d2.toLocaleDateString().replace(/\//g, "-");
    $.ajax({
      type: "get",
      url: `/order/v1/ordertime/${d1}&${d2}&${type}&${no}&${page}`,
      data: "",
      dataType: "json",
      success: function(data) {
        resolve(data);
      },
      error: function(err) {
        reject(err);
      }
    });
  });
};
// 添加订单
var addOrder = function() {
  return new Promise((resolve, reject) => {
    var $status = 2;
    var $orderTime = new Date().format("yyyy-MM-dd hh:mm:ss");
    // console.log($(".form-inline").serialize());
    var $data =
      $(".form-inline").serialize() +
      `&status=${$status}&orderTime=${$orderTime}`;
    // console.log(typeof $data);
    // console.log($data);
    $.ajax({
      type: "post",
      url: "/order/v1/orderadd",
      data: $data,
      dataType: "json",
      success: function(data) {
        resolve(data);
      },
      error: function(err) {
        reject(err);
      }
    });
  });
};

// 给按钮注册点击事件
$(".form-inline .btn-primary").on("click", function(event) {
  event.preventDefault();
  // 保证添加订单前先获取到订单号
  getOrder()
    .then(function(data) {
      // 数据库没有返回订单号就根据当天系统日期初始化订单号
      if (data.orderlist.length == 0) {
        var now = new Date();
        var year = now
          .getFullYear()
          .toString()
          .substring(2);
        var month = (now.getMonth() + 1).toString().padStart(2, "0");
        var day = now
          .getDate()
          .toString()
          .padStart(2, "0");
        orderNo.value = "WS" + year + month + day + "001";
        console.log(orderNo.value);
      } else {
        // 获取数据库返回的数据
        var oldno = data.orderlist[0].orderNo;
        console.log(oldno);
        var temp = "";
        var current = "";
        // 判断返回的字符串以什么开头
        if (oldno.indexOf("WS") > -1) {
          var temp = oldno.substring(0, 8);
          var current = (parseInt(oldno.substring(8)) + 1)
            .toString()
            .padStart(3, "0");
          // oldno.substring(0,8)
          orderNo.value = temp + current;
          // console.log(orderNo.value);
        } else {
          var temp = oldno.substring(0, 9);
          var current = (parseInt(oldno.substring(9)) + 1)
            .toString()
            .padStart(3, "0");
          orderNo.value = temp + current;
          // console.log(orderNo.value);
        }
      }
      return addOrder();
    })
    .then(function(data) {
      console.log(data);
      if (data == 1) {
        var $add = $("#add"); // 模态框组件对象
        $add
          .modal("show")
          .find(".btn-primary")
          .on("click", function(e) {
            $add.modal("hide");
            /*跳转登录*/
            location.href = location.href;
          });
        // 点击否按钮事件
        $add.on("hidden.bs.modal", function(e) {
          $("#tips").html("<span>添加订单成功</span>");
        });
      }
    });
});
```

### callback hell & promise

```js
// 异步编程很难保证代码的执行顺序，通过回调嵌套的方式保证顺序
// 嵌套太深，代码呈现'>'很丑，不好维护
// 凡是数据库操作都是异步的
// 为了解决以上编码方式带来的问题（回调地狱嵌套callback-hell），
// 所以在EcmaScript6中新增了一个API：`Promise`
var fs = require("fs");

fs.readFile("./public/data/a.txt", "utf8", function(err, data) {
  if (err) {
    // return console.log('读取失败')
    // 抛出异常
    //    1. 阻止程序的执行
    //    2. 把错误消息打印到控制台
    throw err;
  }
  console.log(data);
  fs.readFile("./public/data/b.txt", "utf8", function(err, data) {
    if (err) {
      // return console.log('读取失败')
      // 抛出异常
      //    1. 阻止程序的执行
      //    2. 把错误消息打印到控制台
      throw err;
    }
    console.log(data);
    fs.readFile("./public/data/c.txt", "utf8", function(err, data) {
      if (err) {
        // return console.log('读取失败')
        // 抛出异常
        //    1. 阻止程序的执行
        //    2. 把错误消息打印到控制台
        throw err;
      }
      console.log(data);
    });
  });
});
```

```js
// Promise是一个构造函数
var pReadFile = function(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, "utf8", function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

pReadFile("./public/data/a.txt")
  .then(function(data) {
    console.log(data);
    return pReadFile("./public/data/b.txt");
  })
  .then(function(data) {
    console.log(data);
    return pReadFile("./public/data/c.txt");
  })
  .then(function(data) {
    console.log(data);
  });
```

```js
function pGet(url) {
  return new Promise(function(resolve, reject) {
    var oReq = new XMLHttpRequest();
    // 当请求加载成功之后要调用指定的函数
    oReq.onload = function() {
      // 我现在需要得到这里的 oReq.responseText
      resolve(JSON.parse(oReq.responseText));
    };
    oReq.open("get", url, true);
    oReq.send();
  });
}
var data = {};
pGet("http://localhost:3000/jobs")
  .then(function(jobs) {
    data.jobs = jobs;
    return pGet("http://localhost:3000/users/2");
  })
  .then(function(user) {
    data.user = user;
    var html = template("tmpl", data);
    $("#user_form").html(html);
  });
```

### 获取表单系列化数据

```js
var data = $("form").serialize();
console.log(data);
/*数据类型字符串 ==>对象  key1=value1&key2=value2==>{key1:value1,key1:value1}*/
```

```js
var arr = [
  "主键",
  "订单号",
  "发货人姓名",
  "发货人手机",
  "发货地址",
  "下单时间",
  "收货人姓名",
  "收货人手机",
  "收货地址",
  "承运商",
  "商品名称",
  "商品数量",
  "商品类型",
  "物流信息",
  "打包重量",
  "打包体积",
  "实际发货时间",
  "运单号",
  "订单状态"
];
var str = "";
arr.forEach(function(item, i) {
  str += `<td>${arr[i]}</td>`;
});
console.log(str);
var str2 = "";
var arr2 = [
  1,
  "WS191025027",
  "2019-10-25 15:40:09",
  1,
  "潘英豪",
  "15118598500",
  "广东省佛山市三水区云东海碧云路易库电商物流园E栋",
  "文件",
  "文件",
  1,
  1,
  "1*1*1",
  5,
  "2019-07-02 00:00:00",
  "362320640156",
  "何福莲",
  "13556811930",
  "广东省深圳市龙华新区东环二路2号富士康科技集团南大门A01栋",
  5
];
arr2.forEach(function(item, i) {
  str2 += `<td>${arr2[i]}</td>`;
});
console.log(str2);
```

### 审核订单的逻辑

修改订单状态后，重新加载页面

```html
<script type="text/template" id="tmpl_list">
  {{each orderlist}}
  <tr>
    <th>{{$index+1}}</th>
    <td data-no={{$value.orderNo}}>{{$value.orderNo}}</td>
    <td>{{$value.orderTime|dateFormat 'yyyy-MM-dd hh:mm:ss'}}</td>
    <td>{{$value.sname}}</td>
    <td>{{$value.sphone}}</td>
    {{if $value.status == 2}}
    <td>
      <a href="javascript:;" class="btn btn-info btn-sm">批准</a>
      <a href="javascript:;" class="btn btn-warning btn-sm">拒绝</a>
    </td>
    {{else if $value.status == 1}}
      <td>已作废</td>
    {{else}}
      <td>已确认</td>
    {{/if}}
  </tr>
  {{/each}}
</script>
```

### 更新订单信息逻辑

更新成功后，模态框确定与取消事件的处理

```js
// 更新订单
var updateOrder = function() {
  return new Promise((resolve, reject) => {
    var $status = 4;
    var $deliveryTime = new Date().format("yyyy-MM-dd hh:mm:ss");
    var $data =
      $(".updatelist .form-inline").serialize() +
      `&status=${$status}&deliveryTime=${$deliveryTime}`;
    $.ajax({
      type: "put",
      url: "/order/v1/updateorder",
      data: $data,
      dataType: "json",
      success: data => resolve(data),
      error: data => reject(data)
    });
  });
};
// 给按钮注册点击事件提交更改信息
$(".updatelist .btn").on("click", function(event) {
  event.preventDefault();
  updateOrder().then(function(data) {
    // 修改成功
    if (data == 1) {
      var $update = $("#update"); // 模态框组件对象
      $update
        .modal("show")
        .find(".btn-primary")
        .on("click", function(e) {
          $update.modal("hide");
          /*跳转登录*/
          location.href = location.href;
        });
      // 点击否按钮事件
      $update.on("hidden.bs.modal", function(e) {
        $("#tips").html("<span>派车成功</span>");
      });
    }
  });
});
```

### enter 键快捷登录

```js
// 登录页扩展功能
$(document).keyup(function(event) {
  //判断event 的值keyCode 的值，
  //如果这个keyCode 的值等于13 ，说明用户按的是enter 键
  if (event.keyCode == 13) {
    login();
  }
});
```

### 通过服务端 session 拦截页面登录

后台路由接口阻止跳转 没有登录不能访问其他页面

```js
// 引入session中间件模块
const session = require("express-session");

// 尽可能早使用session中间件
app.use(
  session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: "keyboard cat",
    resave: false,
    // 默认值为true，即无论是否使用 Session ，都默认直接给你分配一把钥匙
    saveUninitialized: false
  })
);
app.use(function(req, res, next) {
  var url = req.originalUrl;
  // 没有session并且(是html文件或路径为/或路径为空)并且(路径不包含/userReg.html或/login.html)就跳转到登录页
  if (
    !req.session.user &&
    ((url.indexOf("/") > -1 && url.indexOf(".html") > -1) ||
      url == "/" ||
      url == "") &&
    url.indexOf("/userReg.html") == -1 &&
    url.indexOf("/login.html") == -1
  ) {
    return res.redirect("/login.html");
  }
  next();
});
```

```js
// 1.登录模块 get
router.get("/v1/login/:eid&:pwd", (req, res) => {
  let $eid = req.params.eid;
  let $pwd = req.params.pwd;
  let sql = "select * from user where eid = ? and pwd = ?";
  pool.query(sql, [$eid, $pwd], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      req.session.user = result[0];
      return res.send("1");
    } else {
      return res.send("0");
    }
  });
});
```

```js
// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1. npm install express-session
// 2. 配置 (一定要在 app.use(router) 之前)
// 3. 使用
//    当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
//    添加 Session 数据：req.session.foo = 'bar'
//    访问 Session 数据：req.session.foo
app.use(
  session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: "keyboard cat",
    resave: false,
    // 默认值为true，即无论是否使用 Session ，都默认直接给你分配一把钥匙
    saveUninitialized: false
  })
);

app.use(function(req, res, next) {
  var url = req.originalUrl;
  if (
    !req.session.employee &&
    ((url.indexOf("/admin") > -1 && url.indexOf(".html") > -1) ||
      url == "/admin/") &&
    url.indexOf("/admin/login.html") == -1
  ) {
    return res.redirect("/admin/login.html");
  }
  next();
});
```

```js
// 服务器响应文件
router.get("/", function(req, res) {
  // console.log(req.session.user)
  res.render("index.html", {
    user: req.session.user
  });
});
```

### 后台测试

- 服务器就是一个文件 app.js
- 服务器默认是不开放的，路由 router.js 可以开启其访问权限
- 由于服务器文件越来越多，不可能为所有文件都设定路由
  - 中间件的出现，即相当于给路由添加前缀，过滤路由，给符合条件的路由放行
  - 开启静态资源访问，以文件存放的位置和文件名(具有唯一性)作为标识符直接访问，暴露了服务器的文件目录
- nodejs 功能上类似 Apache web 服务器软件
- 发起 ajax 请求，后台响应 html 模板--OK

### 待完成功能

#### 表单验证

```html
<!-- https://github.com/psyked/bootstrapvalidator -->
<!--检验插件的样式-->
<link
  rel="stylesheet"
  href="assets/bootstrapValidator/css/bootstrapValidator.min.css"
/>
<!--进度条插件-->
<link rel="stylesheet" href="assets/nprogress/nprogress.css" />

<!-- 网页结构没有问题 -->

<!--检验插件的脚本-->
<script src="assets/bootstrapValidator/js/bootstrapValidator.js"></script>
<!--进度条的js-->
<script src="assets/nprogress/nprogress.js"></script>
```

```js
$(function() {
  /*前端校验功能  bootstrap validator*/
  /*1.完整的表单结构  form   input  submit 这些元素*/
  /*2.表单元素需要对应的名字 name="username" */
  /*3.初始化表单验证组件 插件*/
  /*4.配置组件功能*/
  /*5.配置具体的属性需要的校验规则*/
  $("#login")
    .bootstrapValidator({
      /*提示的图标*/
      feedbackIcons: {
        valid: "glyphicon glyphicon-ok",
        invalid: "glyphicon glyphicon-remove",
        validating: "glyphicon glyphicon-refresh"
      },
      /*属性对应的是表单元素的名字*/
      fields: {
        /*配置校验规则*/
        username: {
          /*规则*/
          validators: {
            notEmpty: {
              message: "用户名不能为空"
            },
            /*设置错误信息 和规则无关 和后台校验有关系*/
            callback: {
              message: "用户名错误"
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: "密码不能为空"
            },
            stringLength: {
              min: 6,
              max: 18,
              message: "密码在6-18个字符内"
            },
            callback: {
              message: "密码不正确"
            }
          }
        }
      }
      /*7.表单校验成功*/
    })
    .on("success.form.bv", function(e) {
      /*禁用默认提交的事件 因为要使用ajax提交而不是默认的提交方式*/
      e.preventDefault();
      /*获取当前的表单*/
      var $form = $(e.target);
      /*发送登录请求*/
      $.ajax({
        type: "post",
        url: "/employee/employeeLogin",
        data: $form.serialize(),
        dataType: "json",
        success: function(data) {
          if (data.success) {
            /*后台管理员 root 123456*/
            /*登录成功*/
            location.href = "index.html";
          } else {
            /*登录不成功*/
            /*8.恢复可提交的按钮*/
            $form.data("bootstrapValidator").disableSubmitButtons(false);
            /*9.指定某一个表单元素的错误提示*/
            /* NOT_VALIDATED, VALIDATING, INVALID or VALID */
            if (data.error == 1000) {
              $form
                .data("bootstrapValidator")
                .updateStatus("username", "INVALID", "callback");
            } else if (data.error == 1001) {
              $form
                .data("bootstrapValidator")
                .updateStatus("password", "INVALID", "callback");
            }
          }
        }
      });
    });
  /*重置功能*/
  $('[type="reset"]').on("click", function() {
    /*6.重置验证*/
    $("#login")
      .data("bootstrapValidator")
      .resetForm();
  });
});
```

#### pc 端地址选择 参考移动端

```js
<script src="../js/user/addressManage.js"></script>
<script src="../assets/mui/js/mui.picker.js"></script>
<script src="../assets/mui/js/mui.poppicker.js"></script>
<script src="../js/user/city.js"></script>
```

#### 进度条 Nprogress+ajax

```js
/*后台管理系统的公共js文件*/
/*1.进度显示*/
/*了解jquery相关的ajax方法*/
/*当ajax发生请求 显示进度条*/
/*当ajax请求中没响应过来 显示进度加载*/
/*当ajax完成了结束了  进度条要走完  隐藏*/
/*有相关配置*/
NProgress.configure({ showSpinner: false });
$(window).ajaxStart(function() {
  /*只要使用的ajax就会执行这个方法*/
  /*开启进度条*/
  NProgress.start();
});
$(window).ajaxComplete(function() {
  /*结束进度条*/
  NProgress.done();
});
```

#### 批量操作 审核、上传订单 上传模板(excel)以及下载

#### 文件上传下载

#### 模态框确认信息明确会更加人性化

#### 抽离 art-template 模板
