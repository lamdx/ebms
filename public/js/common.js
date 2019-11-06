$(function() {
  // 获取目录导航栏id
  // var $tid = window.location.search.replace("?tid=", "") || 1;
  // var $cid = window.location.search.exec(/([a-z]+)=([0-9]+)/)
  var reg = /([a-z]+)=([0-9]+)/g;
  var temp = [];
  do {
    var arr = reg.exec(window.location.search);
    // 如果arr不是null，才有必要输出
    arr != null && temp.push(arr[2]);
    // 否则如果arr是null，就什么也不干
  } while (arr != null); // 是循环可以继续的条件，不是退出的条件
  var $cid = temp[1];
  // console.log($cid);
  var $tid = temp[0] || 1;

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
});
