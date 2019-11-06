$(function() {
  $.ajax({
    type: "get",
    url: "/order/v1/noticelist",
    dataType: "json",
    success: function(data) {
      var res = template("tmpl_notice", { notice: data });
      $("tbody")
        .html(res)
        .fadeIn();
    }
  });
});
