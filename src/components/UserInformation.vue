<script setup >
</script>
<template>
  <div class="User">
    <div class="top">
      <p class="sk">散客</p>
      <p class="mag">操作人：小王（12212312321）</p>
      <el-button class="Cancel">全部取消</el-button>
    </div>
    <div class="bot">
      <p class="xjc">洗剪吹</p>
      <p class="price">30</p>
      <p class="num">1</p>
      <ul class="payway">
          <li class="payP">¥30</li>
          <li>微信支付</li>
      </ul>
<div class="cancel">取消</div>
<ul class="oper">
    <li>订单日期：{{2022/10/13}}</li>
    <li>操作时间：{{2022/10/13}}</li>
    <li class="time">时间</li>
    <li>合计金额：¥{{30}}</li>
    <li class="RZ">订单操作日志</li>
</ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
ul{
    list-style: none;
}
.User {
  width: 1600px;
  height: 200px;
  border: 1px solid rgb(207, 207, 207);
  margin-top: 10px;
}
.top {
  width: 1600px;
  height: 44px;
  background: #f6f6f6;
  display: flex;
}
.sk {
  margin-left: 110px;
}
.mag {
  margin-left: 256px;
}
.Cancel {
  margin-left: 700px;
  margin-top: 5px;
}
.bot {
  height: 122px;
  display: flex;
}
.xjc{
     margin-left: 110px;
}
.price{
   margin-left: 250px; 
}
.num{
    margin-left: 245px;
}
.payway{
   margin-left: 204px; 
   line-height: 24px;
   .payP{
       color: #FD476E;
   }
}
.cancel{
    margin-left: 183px;
   color: #486DC5;
   margin-top: 15px;
}
.oper{
   margin-left: 60px; 
   line-height: 24px;
   .time{
       margin-left: 80px;
   }
   li{
       margin-bottom: 5px;
   }
   .RZ{
       color: #54a9e2;
   }
}
</style>