# 技术难点

模板渲染 
pc端地址选择 
<script src="../js/user/addressManage.js"></script>
<script src="../assets/mui/js/mui.picker.js"></script>
<script src="../assets/mui/js/mui.poppicker.js"></script>
<script src="../js/user/city.js"></script>

C:/Users/web/Desktop/DX/eb.sql

审核订单的逻辑 参照百秀项目评论列表

搜索 订单类型 订单状态 订单号 时间 搜索按钮
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
商品信息
goods
商品名称 gname
商品数量 gamount
商品类型 gtype

批量上传订单
上传模板下载
保存

打包重量 重量 gweight	
打包体积 体积 gvolume	
实际发货时间	deliveryTime
运单号 Tracking Number
订单状态 status
签收时间 Signing time

建表 
订单状态 1-作废 2-未审核 3-已确认 4-已发货 5-已签收
承运商 1顺丰 2中通 3圆通 4申通 5韵达
订单类型 1特殊物流订单 2上门取件

数据库设计
// 根据订单号/订单状态/承运商查询订单
// 6.根据订单号修改订单状态 put
// 7.根据订单号上传订单信息
// 8.新增订单

测试发起ajax请求，后台响应html模板--OK

随机订单号生成逻辑还需要处理

// `oid`
// `orderNo`
// `orderTime`
// `orderType`
// `sname`
// `sphone`
// `saddress`
// `rname`
// `rphone`
// `raddress`
// `gname`
// `gtype`
// `gamount`
// `fwd`
// `gweight`
// `gvolume`
// `deliveryTime`
// `tNumber`
// `status`;

电子商务V1.0 物流综合管理平台
请自觉遵守公司资讯安全政策，严禁非授权人员使用本系统！
账号开通请联系谭阳进行提单: TEL:560-72542
系统异常请在企业微信提(SDP)工单

登录页面功能
```js
//我还需要做一个快捷点登录.
$(document).keyup(function(event) {
  //判断event 的值keyCode 的值，
  //如果这个keyCode 的值等于13 ，说明用户按的是enter 键
  if (event.keyCode == 13) {
    login();
  }
});
```

```html
<!-- https://github.com/psyked/bootstrapvalidator -->
 <!--检验插件的样式-->
  <link rel="stylesheet" href="assets/bootstrapValidator/css/bootstrapValidator.min.css">
  <!--进度条插件-->
  <link rel="stylesheet" href="assets/nprogress/nprogress.css">

<!-- 网页结构没有问题 -->
  <!--检验插件的脚本-->
  <script src="assets/bootstrapValidator/js/bootstrapValidator.js"></script>
  <!--进度条的js-->
  <script src="assets/nprogress/nprogress.js"></script>
```

```js
// common.js
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
$('[data-menu]').on('click', function() {
  $('.ad_aside').toggle()
  $('.ad_section').toggleClass('menu')
});

$('.menu [href="javascript:;"]').on('click', function() {
  $(this).siblings('.child').slideToggle()
})

/*3.退出功能*/
/*把html格式的字符串转出 js字符串拼接 数组拼接  http://tools.jb51.net/transcoding/html2js*/
var modalHtml = ['<div class="modal fade" tabindex="-1" id="logoutModal">',
  							'    <div class="modal-dialog modal-sm">',
  							'      <div class="modal-content">',
  							'        <div class="modal-header">',
  							'          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>',
  							'          <h4 class="modal-title">温馨提示</h4>',
  							'        </div>',
  							'        <div class="modal-body">',
  							'          <p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span>你确认要退出吗？</p>',
  							'        </div>',
  							'        <div class="modal-footer">',
  							'          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
  							'          <button type="button" class="btn btn-primary">确定</button>',
  							'        </div>',
  							'      </div><!-- /.modal-content -->',
  							'    </div>',
  							'  </div>'].join("");

$('body').append(modalHtml)
$('[data-logout]').on('click', function() {
	/*需要一个模态框 而且每个页面都需要*/
  var $logoutModal = $('#logoutModal') // 模态框组件对象
  $logoutModal.modal('show').find('.btn-primary').on('click', function(event) {
    /*退出业务*/
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      data: '',
      dataType: 'json',
      success: function(data) {
        if (data.success == true) {
          $logoutModal.modal('hide')
          /*跳转登录*/
          location.href = '/admin/login.html'
        }
      }
    })
  });
})
```

```js
// login.js
$(function() {
  /*前端校验功能  bootstrap validator*/
  /*1.完整的表单结构  form   input  submit 这些元素*/
  /*2.表单元素需要对应的名字 name="username" */
  /*3.初始化表单验证组件 插件*/
  /*4.配置组件功能*/
  /*5.配置具体的属性需要的校验规则*/
  $('#login').bootstrapValidator({
    /*提示的图标*/
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    /*属性对应的是表单元素的名字*/
    fields: {
      /*配置校验规则*/
      username: {
        /*规则*/
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          /*设置错误信息 和规则无关 和后台校验有关系*/
          callback: {
            message: '用户名错误'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 18,
            message: '密码在6-18个字符内'
          },
          callback: {
            message: '密码不正确'
          }
        }
      }
    }
    /*7.表单校验成功*/
  }).on('success.form.bv', function(e) {
    /*禁用默认提交的事件 因为要使用ajax提交而不是默认的提交方式*/
    e.preventDefault();
    /*获取当前的表单*/
    var $form = $(e.target);
    /*发送登录请求*/
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $form.serialize(),
      dataType: 'json',
      success: function(data) {
        if (data.success) {
          /*后台管理员 root 123456*/
          /*登录成功*/
          location.href = 'index.html';
        } else {
          /*登录不成功*/
          /*8.恢复可提交的按钮*/
          $form.data('bootstrapValidator').disableSubmitButtons(false);
          /*9.指定某一个表单元素的错误提示*/
          /* NOT_VALIDATED, VALIDATING, INVALID or VALID */
          if (data.error == 1000) {
            $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
          } else if (data.error == 1001) {
            $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
          }
        }
      }
    });
  });
  /*重置功能*/
  $('[type="reset"]').on('click', function() {
    /*6.重置验证*/
    $('#login').data('bootstrapValidator').resetForm();
  });
});
```
