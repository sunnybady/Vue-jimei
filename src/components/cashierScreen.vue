<script setup>
import { ref } from "vue";
import {useStore}from "vuex"
const store=useStore()
const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const value4 = ref("");
const value5 = ref("");

const options1 = [
  {
    value: "顾客自己下单",
    label: "顾客自己下单",
  },
  {
    value: "员工-老贤",
    label: "员工",
  },
  {
    value: "员工-老香",
    label: "员工-老香",
  },
  {
    value: "员工-老张",
    label: "员工-老张",
  },
];
const options2=[
    {
        value:"已取消",
        label:"已取消"
    },
    {
        value:"已完成",
        label:"已完成"
    }
];
const options3=[
    {
        value:"男",
        label:"男"
    },
    {
        value:"女",
        label:"女"
    }
];
const options4=[
    {
        value:"老贤",
        label:"老贤"
    },
    {
        value:"老香",
        label:"老香"
    },
    {
        value:"老张",
        label:"老张"
    }
];
const options5=[
    {
        value:"01会员卡",
        label:"01会员卡"
    },
    {
        value:"02支付宝",
        label:"02支付宝"
    },
    {
        value:"03微信",
        label:"03微信"
    }
];
</script>
<template>
  <div class="bor">
    <div>
      <span>操作人：</span>
      <el-select v-model="value1" class="m-2" placeholder="全部" size="small">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <span>订单状态：</span>
      <el-select v-model="value2" class="m-2" placeholder="全部" size="small">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <span>顾客性别：</span>
      <el-select v-model="value3" class="m-2" placeholder="全部" size="small">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <span>服务人：</span>
      <el-select v-model="value4" class="m-2" placeholder="全部" size="small">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <span>支付方式：</span>
      <el-select v-model="value5" class="m-2" placeholder="全部" size="small">
        <el-option
          v-for="item in options5"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="qxqr">
      <el-button size="small" @click="store.state.screenFlag=false">取消</el-button>
      <el-button type="primary" size="small">确认</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bor {
  width: 1600px;
  height: 300px;
  background-color: #fff;
  border: 1px solid;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 20px;
}
.qxqr {
  width: 160px;
}
</style>