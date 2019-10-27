const express = require("express");
// 引入连接池模块
const pool = require("../pool");
// 创建路由器对象
let router = express.Router();

// 添加路由
router.get("/index_data", (req, res) => {
  let sql = "select * from jm_site_info";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// 导出路由器对象
module.exports = router;
