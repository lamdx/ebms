const express = require("express");
// 引入连接池模块
const pool = require("../pool");
// 创建路由器对象
let router = express.Router();

// 添加路由
router.get("/login", (req, res) => {
  let obj = req.query;
  let u = obj.uname;
  let s = obj.upwd;
  let sql = "select uid from jm_user where uname=? and upwd=?";
  pool.query(sql, [u, s], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.json({ code: 301, msg: "用户名或者密码错误" });
    } else {
      res.json({ code: 200, msg: "登录成功", name: u });
    }
  });
});
// 导出路由器对象
module.exports = router;
