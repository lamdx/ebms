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
    res.send(result);
  });
});

// 4.侧边栏目录
router.get("/v1/category", (req, res) => {
  let sql = "select * from category";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
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
// 5.2根据订单状态查询订单 1页显示15条记录 2
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
// 5.3根据订单类型查询订单 1页显示15条记录 1
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
// 5.4根据时间查询订单 1页显示15条记录
// http://localhost/order/v1/ordertime/2019-10-23&2019-10-24
router.get("/v1/ordertime/:start&:end", (req, res) => {
  let $start = req.params.start;
  let $end = req.params.end;
  let sql =
    "select * from order_list where orderTime > ? and orderTime < ? ORDER BY orderTime DESC";
  pool.query(sql, [$start, $end], (err, result) => {
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

// 7.根据订单号上传订单信息
router.put("/v1/updateorder", (req, res) => {
  // let $uid = req.body.uid;
  // let $email = req.body.email;
  // let $phone = req.body.phone;
  // let $user_name = req.body.user_name;
  // let $gender = req.body.gender;
  let obj = req.body;
  // console.log(obj);
  if (!obj.opwd) {
    return res.send("-1");
  }
  if (!obj.pwd) {
    return res.send("-2");
  }
  if (!obj.cpwd) {
    return res.send("-3");
  }
  if (obj.opwd == obj.pwd) {
    return res.send("-4");
  }
  let sql = "update user set pwd = ? where eid = ? and pwd = ?;";
  pool.query(sql, [obj.pwd, obj.eid, obj.opwd], (err, result) => {
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
/*
router.post("/v1/orderadd", (req, res) => {
  let obj = req.body;
  console.log(obj);
  if (!obj.eid) {
    return res.send("-1");
  }
  if (!obj.pwd) {
    return res.send("-2");
  }
  if (!obj.cpwd) {
    return res.send("-3");
  }
  if (!obj.email) {
    return res.send("-4");
  }
  if (!obj.phone) {
    return res.send("-5");
  }
  if (!obj.user_name) {
    return res.send("-6");
  }
  if (!obj.gender) {
    return res.send("-7");
  }
  delete obj.cpwd;
  // 用户名/手机号码验证唯一
  let sql = "select * from user where eid = ? or phone = ?";
  pool.query(sql, [obj.eid, obj.phone], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // 用户名/手机号码已存在
      return res.send("0");
    } else {
      // 用户名不存在
      let sql = "insert into user set ? ";
      pool.query(sql, [obj], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.affectedRows > 0) {
          res.send("1");
        } else {
          res.send("2");
        }
      });
    }
  });
});*/
// 导出路由器对象
module.exports = router;
