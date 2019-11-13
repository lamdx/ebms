# 技术难点

## 数据库

数据库 C:/Users/web/Desktop/eb.sql

### 建表

- order_list
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
  商品信息 goods
  商品名称 gname
  商品数量 gamount
  商品类型 gtype
  物流信息
  打包重量 gweight
  打包体积 gvolume
  实际发货时间 deliveryTime
  运单号 Tracking Number
  订单状态 status
  签收时间 Signing time
  列
  oid
  orderNo
  orderTime
  orderType
  sname
  sphone
  saddress
  rname
  rphone
  raddress
  gname
  gtype
  gamount
  fwd
  gweight
  gvolume
  deliveryTime
  tNumber
  status

- order_status
  订单状态 1-作废 2-未审核 3-已确认 4-已发货 5-已签收
- fwd
  承运商 1 顺丰 2 中通 3 圆通 4 申通 5 韵达
- order_type
  订单类型 1 特殊物流订单 2 上门取件

### 数据库设计

// 根据订单号/订单状态/时间查询订单
// 6.根据订单号修改订单状态 put
// 7.根据订单号上传订单信息
// 8.新增订单

## 功能

### 导航栏/侧边目录/路径导航联动

- 测试发起 ajax 请求，后台响应 html 模板--OK

### 列表页

- 搜索条件 订单号 订单类型 时间 (订单状态) 搜索按钮
- 分页接口
- 分页 客户端渲染 模板渲染
- 抽离 art-template 模板 未完成

### 随机订单号生成

#### callback hell & promise

生成新订单前，先从服务端获取最新的单号(异步的)

```js
"1".padStart(10, "0"); // "0000000001"
```

#### 获取表单系列化数据

```js
var data = $("form").serialize();
console.log(data);
/*数据类型字符串 ==>对象  key1=value1&key2=value2==>{key1:value1,key1:value1}*/
```

```js
var arr = [
  "主键",
  "订单号",
  "发货人姓名",
  "发货人手机",
  "发货地址",
  "下单时间",
  "收货人姓名",
  "收货人手机",
  "收货地址",
  "承运商",
  "商品名称",
  "商品数量",
  "商品类型",
  "物流信息",
  "打包重量",
  "打包体积",
  "实际发货时间",
  "运单号",
  "订单状态"
];
var str = "";
arr.forEach(function(item, i) {
  str += `<td>${arr[i]}</td>`;
});
console.log(str);
var str2 = "";
var arr2 = [
  1,
  "WS191025027",
  "2019-10-25 15:40:09",
  1,
  "潘英豪",
  "15118598500",
  "广东省佛山市三水区云东海碧云路易库电商物流园E栋",
  "文件",
  "文件",
  1,
  1,
  "1*1*1",
  5,
  "2019-07-02 00:00:00",
  "362320640156",
  "何福莲",
  "13556811930",
  "广东省深圳市龙华新区东环二路2号富士康科技集团南大门A01栋",
  5
];
arr2.forEach(function(item, i) {
  str2 += `<td>${arr2[i]}</td>`;
});
console.log(str2);
```

### 审核订单的逻辑

### 更新订单信息逻辑

### 登录页参考内容及扩展功能，做一个快捷键登录

```js
$(document).keyup(function(event) {
  //判断event 的值keyCode 的值，
  //如果这个keyCode 的值等于13 ，说明用户按的是enter 键
  if (event.keyCode == 13) {
    login();
  }
});
```

#### 通过服务端 session 拦截页面登录

后台路由接口阻止跳转 没有登录不能访问其他页面

### common.js

- 渲染共同的页面内容
- 显示当前登录用户
- 给art-template注册过滤器
- 格式化日期时间 yyyy-MM-dd hh:mm:ss Date.prototype.format
- 将接口返回的对象数组中的对象的属性名重新命名为 id & option 方便表单select的渲染
- 退出功能

### 待完成功能

- 表单验证
- pc 端地址选择 参考移动端
- 进度条 Nprogress+ajax
- 批量操作 审核、上传订单 上传模板(excel)以及下载
- 文件上传下载
- 抽离 art-template 模板