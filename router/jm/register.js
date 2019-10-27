const express = require("express");
// 引入连接池模块
const pool = require("../pool");
// 创建路由器对象
let router = express.Router();
// 添加路由
router.get("/register", (req, res) => {
  let obj = req.query;
  let uid = obj.uid;
  let uname = obj.uname;
  let upwd = obj.upwd;
  let sql = "insert into jm_user(uid,uname,upwd) values(?,?,?)";
  pool.query(sql, [uid, uname, upwd], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.json({ code: 301, msg: "注册失败" });
    } else {
      res.json({ code: 200, msg: "注册成功" });
    }
  });
});
// 导出路由器对象
module.exports = router;
