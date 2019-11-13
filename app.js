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
    (url.indexOf("/userReg.html") == -1 && url.indexOf("/login.html") == -1)
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
