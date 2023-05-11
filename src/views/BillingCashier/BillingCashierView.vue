<script setup>
import { Search, Edit, Plus, Filter, ArrowDown } from "@element-plus/icons-vue";
import { ref } from "vue";
import UserInformation from "../../components/UserInformation.vue";
import CashierData from "../../components/CashierData.vue";
import cashierPro from "../../components/cashierPro.vue";
import Remark from "../../components/Remark.vue";
import cashierScreen from "../../components/cashierScreen.vue";
import cashierVIP from "../../components/cashierVIP.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { getVIPmessage } from "../../api/cashier";
// import type { Action } from 'element-plus'

const router = useRouter();
const store = useStore();

const input = ref("");
// 数据请求
getVIPmessage().then((res) => {
  // console.log(res);
});
const optionsXF = [
  {
    value: "按订单日期排序",
    label: "按订单日期排序",
  },
  {
    value: "按操作时间排序",
    label: "按操作时间排序",
  },
];
</script>




<template>
  <div class="contener">
    <!-- 开单收银 -->
    <cashierVIP class="cvip" v-show="store.state.vipMesFlag" />
    <div class="cashier">
      <p>开单收银</p>

      <el-input
        class="cas-inp"
        v-model="input"
        placeholder="请输入会员昵称，手机号或者会员卡号来查询会员信息"
        @input="store.commit('search', input)"
        clearable
      >
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>

      <ul class="res" v-show="store.state.searchres[0]">
        <li
          class="resLi"
          v-for="item in store.state.searchres"
          :key="item.telephone"
          @click="store.commit('showVip', item)"
        >
          {{
            item.vipName + "  |  " + item.telephone + "  |   " + item.cardnum
          }}
        </li>
      </ul>
    </div>
    <!-- 项目 -->
    <CashierData v-show="store.state.flag" class="cd" />
    <cashierPro v-show="store.state.myTD.showPro" class="cp" />
    <remark v-show="store.state.remarkFlag" class="Remark" />

    <div class="Project">
      <p>项目</p>
      <div @click="store.commit('showDate')">
        <span>修改订单日期</span>
        <el-icon class="edit" :size="20">
          <Edit />
        </el-icon>
      </div>

      <span>{{ store.state.value1 }}</span>

      <el-table :data="store.state.tableData" style="width: 100%">
        <el-table-column
          class="th"
          prop="mproject"
          label="项目"
          width="303px"
        />

        <el-table-column class="th" prop="num" label="数量" width="303px" />

        <el-table-column
          class="th"
          prop="payment"
          label="收款方式"
          width="303px"
        />
        <el-table-column
          class="th"
          prop="money"
          label="收款金额"
          width="303px"
        />
        <el-table-column class="th" prop="take" label="操作" width="303px">
          <template #default>
            <el-button size="small" type="primary" @click="store.commit('remF')"
              >备注</el-button
            >

            <el-button
              size="small"
              type="danger"
              @click="store.commit('clearPro')"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="add">
        <div @click="store.commit('changeP')">
          <el-icon class="plus" :size="20">
            <Plus />
          </el-icon>
          新增
        </div>

        <div class="clear">一键清除所有项目</div>
      </div>

      <div class="mymoney">实收金额：¥0.00</div>
      <el-button class="settle" size="small" type="primary">结账</el-button>
    </div>

    <!-- 消费订单 -->
    <cashierScreen v-show="store.state.screenFlag" />
    <div class="order">
      <p class="xf">消费订单</p>
      <div class="xf-sel">
        <el-select
          v-model="value"
          class="mysel"
          placeholder="按订单日期排序"
          size="small"
        >
          <el-option
            v-for="item in optionsXF"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div style="float: right" @click="store.state.screenFlag = true">
          <el-icon><Filter /></el-icon>
          筛选
        </div>
      </div>
      <!-- 表头 -->
      <div class="kind">
        <p>项目名称</p>
        <p>原价</p>
        <p>数量</p>
        <p>实收</p>
        <p>操作</p>
        <p class="xq">订单详情</p>
      </div>
      <!-- 选择日期 -->
      <div class="selDate">
        <div>2022/10/13</div>
        <el-icon class="AD"><ArrowDown /></el-icon>
        详细信息
      </div>
      <UserInformation />
    </div>
  </div>
</template>

<style lang="scss">
ul,
li {
  list-style: none;
}
.contener {
  position: relative;
  widows: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding: 10px;
}
.cashier {
  width: 1600px;
  height: 80px;
  // overflow: hidden;
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;

  p {
    border-left: 6px solid;
    width: 56px;
    height: 15px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #666666;
    // line-height: 30px;
    padding-left: 8px;
  }
  .cas-inp {
    width: 1520px;
    margin-left: 25px;
    border: 2px solid rgb(135, 178, 235);
    border-radius: 5px;
  }
  .res {
    background-color: rgb(241, 238, 238);
    margin: 0;
    padding: 0;
    width: 1487px;
    height: 40px;
    font-size: 20px;
    line-height: 40px;

    position: absolute;
    z-index: 999;
    left: 78px;
    border-radius: 5px;
  }
  .resLi {
    box-sizing: border-box;
    padding: 5px;
    width: 1487px;
    height: 40px;
    background-color: rgb(203, 230, 248);
    border-bottom: 1px solid rgb(192, 192, 192);
  }
}
.el-message-box {
  position: absolute;
  z-index: 99999;
  top: 300px;
  left: 400px;
}
.cvip {
  position: absolute;
  z-index: 9999;
  left: 580px;
  top: 200px;
}
// ------------------------------------------
.cd {
  position: absolute;
  z-index: 999;
  background-color: #fff;
  right: 5px;
  top: 150px;
}
.cp {
  position: absolute;
  z-index: 999;
  background-color: #fff;
  left: 11px;
  top: 286px;
}
.Remark {
  position: absolute;
  top: 100px;
  left: 500px;
  z-index: 999;
}
.Project {
  // height: 100px;
  width: 1600px;
  position: relative;
  overflow: hidden;
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;

  p {
    float: left;
    border-left: 6px solid;
    width: 56px;
    height: 15px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #666666;
    // line-height: 30px;
    padding-left: 8px;
  }
  span {
    float: right;
    margin-right: 5px;
  }
  .edit {
    float: right;
  }
  .th {
    border: 1px solid #d8d7d7;
    // background-color: rgb(233, 233, 233);
  }
  .add {
    position: relative;
    margin-top: 5px;
    border-bottom: 1px solid rgb(207, 206, 206);
    margin-bottom: 10px;
  }
  .plus {
    // position: absolute;
    top: 1px;
  }
  .clear {
    float: right;
    line-height: 30px;
  }
  .mymoney {
    float: right;
    clear: both;
  }

  .settle {
    float: right;
    clear: both;
  }
}
.order {
  width: 1600px;
  overflow: hidden;
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  .xf {
    float: left;
    border-left: 6px solid;
    width: 56px;
    height: 15px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #666666;
    // line-height: 30px;
    padding-left: 8px;
    clear: both;
  }
  .xf-sel {
    clear: both;
  }
  .kind {
    margin: 10px 0 10px 0;
    width: 1600px;
    height: 44px;
    background: #f5f5f5;
    display: flex;
    justify-content: space-around;
  }
  .selDate {
    width: 1600px;
    height: 40px;
    line-height: 40px;
    background: #e5ecfd;
    display: flex;
    padding: 10px;
    .AD {
      margin-top: 10px;
    }
  }
}
.xq {
  width: 200px;
}
</style>