$(function() {
  // 初始化查询日期
  $("#tstart").val(
    new Date(new Date().setDate(new Date().getDate() - 30)).format("yyyy-MM-dd")
  );

  // 当前页码
  var currentPage = 1;
  // 加载指定页数据
  function loadPage(page) {
    var $start = tstart.value || "2019-10-01";
    var $end = tend.value || "2019-12-31";
    // $("tbody").fadeOut();
    $.ajax({
      type: "get",
      url: "/order/v1/noticelist",
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
          totalPages: data.total_pages || 1,
          visiblePages: 5,
          onPageClick: function(e, page) {
            // 点击分页页码才会执行这里的代码
            loadPage(page);
            currentPage = page;
          }
        });
        var res = template("tmpl_notice", { notice: data });
        $("tbody")
          .html(res)
          .fadeIn();
      }
    });
  }
  loadPage(currentPage);
});
