# 技术难点

模板渲染 
pc端地址选择 
<script src="../js/user/addressManage.js"></script>
<script src="../assets/mui/js/mui.picker.js"></script>
<script src="../assets/mui/js/mui.poppicker.js"></script>
<script src="../js/user/city.js"></script>

C:/Users/web/Desktop/DX/eb.sql

审核订单的逻辑 参照百秀项目评论列表

搜索 订单类型 订单状态 订单号 时间 搜索按钮
基本信息
主键 oid
订单号 orderNo 
sender
发货人姓名 sname
发货人手机 sphone
发货地址 saddress
下单时间 orderTime
receiving
收货人姓名 rname 
收货人手机 rphone
收货地址 raddress
承运商 fwd
商品信息
goods
商品名称 gname
商品数量 gamount
商品类型 gtype

批量上传订单
上传模板下载
保存

打包重量 重量 gweight	
打包体积 体积 gvolume	
实际发货时间	deliveryTime
运单号 Tracking Number
订单状态 status
签收时间 Signing time

建表 
订单状态 1-作废 2-未审核 3-已确认 4-已发货 5-已签收
承运商 1顺丰 2中通 3圆通 4申通 5韵达
订单类型 1特殊物流订单 2上门取件

数据库设计
// 根据订单号/订单状态/承运商查询订单
// 6.根据订单号修改订单状态 put
// 7.根据订单号上传订单信息
// 8.新增订单

测试发起ajax请求，后台响应html模板--OK

