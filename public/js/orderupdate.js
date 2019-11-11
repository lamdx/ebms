$(function() {
  // 渲染订单类型选项
  EB.getOption("/order/v1/order_type", document.getElementById("orderType"));
  // 渲染承运商选项
  EB.getOption("/order/v1/fwd", document.getElementById("fwd"));
  // 初始化查询日期
  $("#tstart").val(
    new Date(new Date().setDate(new Date().getDate() - 30)).format("yyyy-MM-dd")
  );
  // 根据订单号查询到相应的信息
  $("form .osearch").on("click", function(event) {
    event.preventDefault();
    var $start = $("#tstart").val() || "2019-10-01";
    var $end = $("#tend").val() || "2019-12-31";
    var $orderType = $("#orderType").val();
    var $orderNo = $("#orderNo").val();
    var $page = 1;
    // 如果没有输入订单号，就返回false
    if (!$orderNo) {
      return false;
    }
    $.ajax({
      type: "get",
      url: `/order/v1/ordertime/${$start}&${$end}&${$orderType}&${$orderNo}&${$page}`,
      dataType: "json",
      success: function(data) {
        console.log(data);
        var $obj = data.orderlist[0];
        $(".updatelist").removeClass("invisible");
        $(".updatelist #sname").val($obj.sname);
        $(".updatelist #sphone").val($obj.sphone);
        $(".updatelist #fwd").val($obj.fwd);
        $(".updatelist #gweight").val($obj.gweight);
        $(".updatelist #gvolume").val($obj.gvolume);
        $(".updatelist #tNumber").val($obj.tNumber);
        $(".updatelist [name='orderNo']").val($obj.orderNo);
      }
    });
  });

  // 更新订单
  var updateOrder = function() {
    return new Promise((resolve, reject) => {
      var $status = 4;
      var $deliveryTime = new Date().format("yyyy-MM-dd hh:mm:ss");
      var $data =
        $(".updatelist .form-inline").serialize() +
        `&status=${$status}&deliveryTime=${$deliveryTime}`;
      console.log(typeof $data);
      console.log($data);
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
      console.log(data);
      // 修改成功
      if (data == 1) {
        var $saveModal = $("#exampleModal");
        $saveModal
          .modal("show")
          .find(".btn-primary")
          .on("click", function(e) {
            $saveModal.modal("hide");
            /*跳转登录*/
            location.href = location.href;
          });
        // 点击否按钮事件
        $saveModal.on("hidden.bs.modal", function(e) {
          $("#tips").html("<span>派车成功</span>");
        });
      }
    });
  });
});
