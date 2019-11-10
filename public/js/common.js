$(function() {
  // 获取侧边栏目录中列表id以及顶部导航栏导航id
  // var $tid = window.location.search.replace("?tid=", "") || 1;
  var reg = /([a-z]+)=([0-9]+)/g;
  var temp = [];
  do {
    var arr = reg.exec(window.location.search);
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
      var res = template("tmpl_nav", {
        nav: data,
        tid: $tid
      });
      $(".navbar-nav")
        .html(res)
        .fadeIn();
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
      // 毫秒是占一位字符的
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
    return fmt;
  };
  // var date = new Date();
  // dateFormat(date, "yyyy-MM-dd hh:mm:ss");

  // 给art-template注册过滤器 格式化承运商
  template.defaults.imports.fwdFormat = function(fwd) {
    switch (fwd) {
      case 1:
        fwd = "顺丰";
        break;
      case 2:
        fwd = "中通";
        break;
      case 3:
        fwd = "圆通";
        break;
      case 4:
        fwd = "申通";
        break;
      case 5:
        fwd = "韵达";
        break;
    }
    return fwd;
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

  window.EB = {};
  // 将返回的对象数组中的对象的属性名重新命名为 id & option
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
});
