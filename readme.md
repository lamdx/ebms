# 技术难点

## 数据库

数据库 C:/Users/web/Desktop/DX/eb.sql

建表
order_list
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

order_status
订单状态 1-作废 2-未审核 3-已确认 4-已发货 5-已签收
fwd
承运商 1 顺丰 2 中通 3 圆通 4 申通 5 韵达
order_type
订单类型 1 特殊物流订单 2 上门取件

数据库设计
// 根据订单号/订单状态/承运商查询订单
// 6.根据订单号修改订单状态 put
// 7.根据订单号上传订单信息
// 8.新增订单

## 功能

测试发起 ajax 请求，后台响应 html 模板--OK

审核订单的逻辑 参照百秀项目评论列表

搜索条件 时间 订单类型 (订单状态) 订单号 搜索按钮

批量上传订单 上传模板(excel)下载

随机订单号生成逻辑还需要处理
生成新订单前，先从服务端获取最新的单号(异步的)

模板渲染

### pc 端地址选择 参考移动端

```js
<script src="../js/user/addressManage.js"></script>
<script src="../assets/mui/js/mui.picker.js"></script>
<script src="../assets/mui/js/mui.poppicker.js"></script>
<script src="../js/user/city.js"></script>
```

### 登录页参考内容及扩展功能，做一个快捷键登录

```js
/*
 * 电子商务 V1.0 物流综合管理平台
 * 请自觉遵守公司资讯安全政策，严禁非授权人员使用本系统！
 * 账号开通请联系谭阳进行提单: TEL:560-72542
 * 系统异常请在企业微信提(SDP)工单
 */

$(document).keyup(function(event) {
  //判断event 的值keyCode 的值，
  //如果这个keyCode 的值等于13 ，说明用户按的是enter 键
  if (event.keyCode == 13) {
    login();
  }
});
```

### 登录验证

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

### common.js

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

/*2.侧边栏的显示隐藏 二级菜单的显示隐藏*/
$("[data-menu]").on("click", function() {
  $(".ad_aside").toggle();
  $(".ad_section").toggleClass("menu");
});

$('.menu [href="javascript:;"]').on("click", function() {
  $(this)
    .siblings(".child")
    .slideToggle();
});

/*3.退出功能*/
/*把html格式的字符串转出 js字符串拼接 数组拼接  http://tools.jb51.net/transcoding/html2js*/
var modalHtml = [
  '<div class="modal fade" tabindex="-1" id="logoutModal">',
  '    <div class="modal-dialog modal-sm">',
  '      <div class="modal-content">',
  '        <div class="modal-header">',
  '          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>',
  '          <h4 class="modal-title">温馨提示</h4>',
  "        </div>",
  '        <div class="modal-body">',
  '          <p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span>你确认要退出吗？</p>',
  "        </div>",
  '        <div class="modal-footer">',
  '          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
  '          <button type="button" class="btn btn-primary">确定</button>',
  "        </div>",
  "      </div><!-- /.modal-content -->",
  "    </div>",
  "  </div>"
].join("");

$("body").append(modalHtml);
$("[data-logout]").on("click", function() {
  /*需要一个模态框 而且每个页面都需要*/
  var $logoutModal = $("#logoutModal"); // 模态框组件对象
  $logoutModal
    .modal("show")
    .find(".btn-primary")
    .on("click", function(event) {
      /*退出业务*/
      $.ajax({
        type: "get",
        url: "/employee/employeeLogout",
        data: "",
        dataType: "json",
        success: function(data) {
          if (data.success == true) {
            $logoutModal.modal("hide");
            /*跳转登录*/
            location.href = "/admin/login.html";
          }
        }
      });
    });
});
```

### login.js

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

### 导航栏

```html
<nav class="navbar navbar-default">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button
        type="button"
        class="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#bs-example-navbar-collapse-1"
        aria-expanded="false"
      >
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">
        <img width="90px" src="/public/img/logo3.png" alt="" />
      </a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <!-- <ul class="nav navbar-nav">
          <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
          <li><a href="#">Link</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
        </ul> -->
      <form class="navbar-form navbar-left">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search" />
        </div>
      </form>
      <ul class="nav navbar-nav navbar-right">
        {{ if user }}
        <a class="btn btn-default navbar-btn" href="/topics/new">发起</a>
        <li class="dropdown">
          <a
            href="#"
            class="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            ><img
              width="20"
              height="20"
              src="../public/img/avatar-default.png"
              alt=""/>
            <span class="caret"></span
          ></a>
          <ul class="dropdown-menu">
            <li class="dropdown-current-user">
              当前登录用户: {{ user.nickname }}
            </li>
            <li role="separator" class="divider"></li>
            <li><a href="#">个人主页</a></li>
            <li><a href="/settings/profile">设置</a></li>
            <li><a href="/logout">退出</a></li>
          </ul>
        </li>
        {{ else }}
        <a class="btn btn-primary navbar-btn" href="/login">登录</a>
        <a class="btn btn-success navbar-btn" href="/register">注册</a>
        {{ /if }}
      </ul>
    </div>
    <!-- /.navbar-collapse -->
  </div>
  <!-- /.container-fluid -->
</nav>
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

### 通过服务端 session 拦截页面登录

```js
var session = require("express-session");

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

### 获取表单系列化数据

```js
var data = $("form").serialize();
console.log(data);
/*数据类型字符串 ==>对象  key1=value1&key2=value2==>{key1:value1,key1:value1}*/
```

```js
<script>
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
    arr.forEach(function (item, i) {
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
    arr2.forEach(function (item, i) {
      str2 += `<td>${arr2[i]}</td>`;
    });
    console.log(str2);
  </script>
```

### 抽离 art-template 模板

### 分页接口

```js

$page = empty($_GET['page']) ? 1 : intval($_GET['page']);// 转换成数值
$length = 8;
$skip = ($page - 1) * $length;

$sql = sprintf('select
 comments.*,
 posts.title as post_title
 from comments
 inner join posts on comments.post_id = posts.id
 order by comments.created desc
 limit %d, %d;', $skip, $length);

// 查询所有的评论数据
$comments = xiu_fetch_all($sql);

// 先查询到所有数据的数量
$total_count = xiu_fetch_one('select count(1) as count
 from comments
 inner join posts on comments.post_id = posts.id')['count'];
// 计算总页数
$total_pages = ceil($total_count / $length);

// 因为网络之间传输的只能是字符串
// 所以我们先将数据转换为字符串（序列化）
$json = json_encode(array(
	'total_pages' => $total_pages,
	'comments' => $comments
));


  window.page = 1
  /*1.默认第一页展示*/
  var render = function() {
    getSecondCateData(function(data) {
      console.log(data)
      /*模板渲染*/
      $('tbody').html(template('list', data))
      /*初始化分页组件  根据数据*/
      /*2.分页展示*/
      $('.pagination').bootstrapPaginator({
      	/*对应的bootstrap版本*/
        bootstrapMajorVersion: 3,
        /*分页按钮的大小 mini,small,normal,large*/
        size: 'small',
        alignment: 'center',
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
          window.page = page
          render()
        }
      });
    })
  }
  render();
```

### 分页 客户端渲染

```html
<ul class="pagination pagination-sm pull-right"></ul>
<script src="/static/assets/vendors/twbs-pagination/jquery.twbsPagination.js"></script>
<script id="comment_tmpl" type="text/x-jsrender">
  {{for comments}}
    <tr class="{{: status === 'held' ? 'warning' : status === 'rejected' ? 'danger' : '' }}" data-id="{{: id }}">
      <td class="text-center"><input type="checkbox"></td>
      <td>{{: author }}</td>
      <td>{{: content }}</td>
      <td>{{: post_title }}</td>
      <td>{{: created }}</td>
      <td>{{: status === 'held' ? '待审' : status === 'rejected' ? '拒绝' : '准许' }}</td>
      <td class="text-center">
        {{if status === 'held'}}
        <a href="javascript:;" class="btn btn-info btn-xs btn-edit" data-status="approved">批准</a>
        <a href="javascript:;" class="btn btn-warning btn-xs btn-edit" data-status="rejected">拒绝</a>
        {{/if}}
        <a href="javascript:;" class="btn btn-danger btn-xs btn-delete">删除</a>
      </td>
    </tr>
  {{/for}}
</script>
<script>
  // 选中项集合
  var allCheckeds = [];
  // 当前页码
  var currentPage = 1;

  /**
   * 加载指定页数据
   */
  function loadPage(page) {
    $tbody.fadeOut();
    $.getJSON("/admin/api/comments.php", { page: page }, function(data) {
      console.log(data);
      if (page > data.total_pages) {
        // 删除完最后一页数据时跳转面到临界页面，即新的最后一页
        loadPage(data.total_pages);
        return;
      }

      // 动态总页数 调用destroy方法，然后使用新选项初始化它
      $(".pagination").twbsPagination("destroy");
      // 分页组件
      $(".pagination").twbsPagination({
        // 渲染分页页面组件
        initiateStartPageClick: false, // 否则 onPageClick 第一次就会触发
        first: "首页",
        last: "未页",
        prev: "上一页",
        next: "下一页",
        startPage: page,
        totalPages: data.total_pages,
        visiblePages: 5,
        onPageClick: function(e, page) {
          // 点击分页页码才会执行这里的代码
          loadPage(page);
          currentPage = page;
        }
      });
      // 将数据渲染到页面上
      var html = $("#comment_tmpl").render({ comments: data.comments });
      $tbody.html(html).fadeIn();
    });
  }
  loadPage(currentPage);
</script>
```

### callback hell

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

### promise

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
