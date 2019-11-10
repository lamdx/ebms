$(function() {
  // 渲染订单类型选项
  EB.getOption("/order/v1/order_type", document.getElementById("orderType"));
  // 渲染承运商选项
  EB.getOption("/order/v1/fwd", document.getElementById("fwd"));

  // 生成订单号
  var getOrder = function() {
    return new Promise((resolve, reject) => {
      // WS191023023 PKS191023038
      // 获取订单类型和订单号
      var type = orderType.value ? orderType.value : 0;
      console.log(type);
      // var no = orderNo.value ? orderNo.value : 0;
      var no = 0;
      console.log(no);
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
      console.log($(".form-inline").serialize());
      var $data =
        $(".form-inline").serialize() +
        `&status=${$status}&orderTime=${$orderTime}`;
      console.log(typeof $data);
      console.log($data);
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
        if(data == 1){
          var $saveModal=$('#exampleModal')
          $saveModal
          .modal("show")
          .find(".btn-primary")
          .on('click',function(e){
            $saveModal.modal("hide");
            /*跳转登录*/
            location.href = location.href;
          })
          $saveModal.on('hidden.bs.modal', function (e) {
            // do something...
            console.log(1);
            $('#tips').html('<span>添加订单成功</span>')
          })
        }
      });
    return;
  });
});

// 生成订单号
// function getOrder() {
//   // WS191023023 PKS191023038
//   // 获取订单类型和订单号
//   var type = orderType.value ? orderType.value : 0;
//   console.log(type);
//   // var no = orderNo.value ? orderNo.value : 0;
//   var no = 0;
//   console.log(no);
//   var page = 1;
//   // var d1 = new Date("2019-10-23");
//   // 将日期格式中的 / 改为 -
//   var d1 = new Date().toLocaleDateString().replace(/\//g, "-");
//   var d2 = new Date(d1);
//   // 原日期加上1天
//   d2.setDate(d2.getDate() + 1);
//   d2 = d2.toLocaleDateString().replace(/\//g, "-");
//   var xhr = new XMLHttpRequest();
//   xhr.open(
//     "get",
//     `/order/v1/ordertime/${d1}&${d2}&${type}&${no}&${page}`,
//     true
//   );
//   xhr.send();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       var res = JSON.parse(xhr.responseText);
//       console.log(res);
//       // 数据库没有返回订单号就根据当天系统日期初始化订单号
//       if (res.orderlist.length == 0) {
//         var now = new Date();
//         var year = now
//           .getFullYear()
//           .toString()
//           .substring(2);
//         var month = (now.getMonth() + 1).toString().padStart(2, "0");
//         var day = now
//           .getDate()
//           .toString()
//           .padStart(2, "0");
//         orderNo.value = "WS" + year + month + day + "001";
//         console.log(orderNo.value);
//       } else {
//         // 获取数据库返回的数据
//         var oldno = res.orderlist.orderNo;
//         console.log(oldno);
//         var temp = "";
//         var current = "";
//         // 判断返回的字符串以什么开头
//         if (oldno.indexOf("WS") > -1) {
//           var temp = oldno.substring(0, 8);
//           var current = (parseInt(oldno.substring(8)) + 1)
//             .toString()
//             .padStart(3, "0");
//           // oldno.substring(0,8)
//           orderNo.value = temp + current;
//           // console.log(orderNo.value);
//         } else {
//           var temp = oldno.substring(0, 9);
//           var current = (parseInt(oldno.substring(9)) + 1)
//             .toString()
//             .padStart(3, "0");
//           orderNo.value = temp + current;
//           // console.log(orderNo.value);
//         }
//       }
//     }
//   };
// }

// getOrder();

// 添加订单
// function addOrder() {
//   getOrder();
//   var $orderType = orderType.value;
//   var $sname = sname.value;
//   var $sphone = sphone.value;
//   var $saddress = saddress.value;
//   var $rname = rname.value;
//   var $rphone = rphone.value;
//   var $raddress = raddress.value;
//   var $gname = gname.value;
//   var $gtype = gtype.value;
//   var $gamount = gamount.value;
//   var $fwd = fwd.value;
//   // 获取随机订单号，设置订单初始状态和创建时间
//   var $orderNo = orderNo.value;
//   console.log(orderNo.value);
//   var $status = 2;
//   var $orderTime = new Date().format("yyyy-MM-dd hh:mm:ss");
//   var xhr = new XMLHttpRequest();
//   xhr.open("post", "/order/v1/orderadd", true);
//   var formdata = `orderType=${$orderType}&sname=${$sname}&sphone=${$sphone}&saddress=${$saddress}&rname=${$rname}&rphone=${$rphone}&raddress=${$raddress}&gname=${$gname}&gtype=${$gtype}&gamount=${$gamount}&fwd=${$fwd}&orderNo=${$orderNo}&status=${$status}&orderTime=${$orderTime}`;
//   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//   xhr.send(formdata);
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       var res = xhr.responseText;
//       console.log(res);
//     }
//   };
// }
