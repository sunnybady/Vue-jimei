<script setup>
import { ref, reactive, computed, h } from 'vue'

import { getManagerList, addManager, editManager, delManager, searchManager, rCharge } from '@/api/manager.js'



import { ElMessage, ElNotification } from 'element-plus'
let managerCard = ref('')
let managerName = ref('')
let cardDate = ref('')
let managerTell = ref('')
let managerLv = ref('')
const managerList = ref([])
let interfaceType = ref('10086')
let lastCard = ref('')

//余额
let balance = ref(0)
//获取商品列表

getManagerList().then(res => {
  console.log(res);
  managerList.value = res
}
)




//分页模块
//当前页面
let currentPage = ref(1)
let mcurrentPage = ref(1)
let computedTableData = computed(() => {
  return managerList.value.slice((currentPage.value - 1) * 10, (currentPage.value - 1) * 10 + 10)
})

let computedmTableData = computed(() => {
  return moneyList.value.slice((mcurrentPage.value - 1) * 10, (mcurrentPage.value - 1) * 10 + 10)
})

//消息框

const dialogTableVisible = ref(false)
//消息框是否弹出
const addForm = ref(false)
const reChargeForm = ref(false)
const formLabelWidth = '100px'
//会员数据
const form = reactive({
  managerName: '',
  managerCard: lastCard,
  password: '',
  cardDate: '',
  managerTell: '',
  balance: balance,
  remarks: '',
  managerLv: '',
  managerState: '激活'
})



const moneyTable = ref(false)
const moneyList = ref([])


//修改会员信息
function editClick(row) {
  interfaceType.value = '10010'
  //打开消息框
  addForm.value = true
  console.log(row);
  form.managerName = row.managerName
  form.managerCard = row.managerCard
  form.password = row.password
  form.cardDate = row.cardDate
  form.managerTell = row.managerTell
  form.balance = row.balance
  form.remarks = row.remarks
  form.managerLv = row.managerLv
}
function upData() {
  editManager(form).then(res => {
    addForm.value = false
    //重新获取列表
    getManagerList().then(res => {
      managerList.value = res

    }
    )
  })
}
//删除
function delClick(row) {
  console.log(row);
  delManager({
    managerCard: row.managerCard
  }).then(res => {
    console.log(res);
    getManagerList().then(res => {
      managerList.value = res
      //保存当前最后一个卡号
    }
    )

  })
}

//查询
function search() {
  searchManager({
    managerCard: managerCard.value
  }).then(res => {
    //重新获取列表
    console.log(res.newdata);
    managerList.value = res.newdata

  })
}
//查看订单状态


const lookorder = () => {
  ElNotification({
    title: '订单操作日志',
    message: h('i', { style: 'color: teal' },
      `取消项目名称：洗剪吹
    操作人：老袁
    操作人电话：13705871036
    取消订单时间：2024/1/1
    取消设备:谷歌浏览器
    `
    ),
  })
}


const value = ref('')
const holidays = [
  '2021-10-01',
  '2021-10-02',
  '2021-10-03',
  '2021-10-04',
  '2021-10-05',
  '2021-10-06',
  '2021-10-07',
]

const isHoliday = ({ dayjs }) => {
  return holidays.includes(dayjs.format('YYYY-MM-DD'))
}
</script>
  

<template>
  <div class="box-top">
    <div class="input">
      <p>会员管理卡号:
        <el-input v-model="managerCard" placeholder="请输入会员卡号" />
      </p>
      <p>身份:
        <el-select v-model="managerLv" placeholder="请选择身份" size="large">
          <el-option label="会员" value="会员" />
          <el-option label="散客" value="散客" />
        </el-select>
      </p>

      <p class="demo-date-picker">
        <span>消费日期:</span>
        <el-date-picker v-model="value" type="date" placeholder="请选择日期" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
          size="large">
          <template #default="cell">
            <div class="cell" :class="{ current: cell.isCurrent }">
              <span class="text">{{ cell.text }}</span>
              <span v-if="isHoliday(cell)" class="holiday" />
            </div>
          </template>
        </el-date-picker>
      </p>


      <p>订单编号:<el-input v-model="managerTell" placeholder="请输入订单编号" /></p>
      <p>服务项目：
        <el-select v-model="managerLv" placeholder="请选择服务项目" size="large">
          <el-option label="洗剪吹" value="洗剪吹" />
          <el-option label="烫" value="烫" />
          <el-option label="染" value="染" />
        </el-select>
      </p>
    </div>

    <el-row class="button">
      <el-button type="primary" @click="search">查询</el-button>
    </el-row>
  </div>
  <!-- 分页 -->

  <el-pagination v-model:current-page='currentPage' background layout="prev, pager, next" :total="managerList.length" />

  <el-table :data="computedTableData" style="width: 100%">
    <el-table-column prop="managerCard" label="订单编号" width="100" />
    <el-table-column prop="password" label="身份" width="120" />
    <el-table-column prop="managerName" label="会员卡号" />
    <el-table-column prop="cardDate" label="消费时间" width="140"/>
    <el-table-column prop="managerTell" label="订单状态" width="140"/>
    <el-table-column prop="managerTell" label="订单总金额" width="140" />
    <el-table-column prop="managerTell" label="会员等级" width="140"/>
    <el-table-column prop="managerState" label="服务项目" />
    <el-table-column prop="managerLv" label="价格" />
    <el-table-column prop="remarks" label="数量" />
    <el-table-column prop="balance" label="订单操作日志" width="140">
      <template #default="scope">
        <el-button @click="lookorder" size="small" :text='true'>订单操作日志</el-button>
      </template>
    </el-table-column>

    <el-table-column prop="address" label="操作" width="140">
      <template #default="scope">
        <el-button @click="editClick(scope.row)" type="primary" size="small">修改</el-button>
        <el-button type="success" size="small" @click="delClick(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 修改会员 -->
  <el-dialog v-model="addForm" :title="interfaceType == '10086' ? '新增会员' : '修改会员信息'" width="410px">
    <el-form :model="form">

      <!-- 会员卡号 -->
      <el-form-item label="订单编号" :label-width="formLabelWidth">
        <el-input v-model="form.managerCard" autocomplete="off" disabled />
      </el-form-item>
      <!-- 会员密码 -->
      <el-form-item label="消费时间" :label-width="formLabelWidth">
        <el-input v-model="form.cardDate" autocomplete="off" disabled />
      </el-form-item>
      <!-- 会员名称 -->
      <el-form-item label="折后总金额" :label-width="formLabelWidth">
        <el-input v-model="form.managerName" autocomplete="off" />
      </el-form-item>
      <!-- 办卡日期 -->
      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input v-model="form.cardDate" autocomplete="off" />
      </el-form-item>
      <!-- 联系方式 -->
      <el-form-item label="订单状态" :label-width="formLabelWidth">
        <el-input v-model="form.managerTell" autocomplete="off" />
      </el-form-item>

      <!-- 消费项目 -->
      <el-form-item label="消费项目" :label-width="formLabelWidth">
        <el-select v-model="form.managerState" placeholder="请选择会员等级">
          <el-option label="洗剪吹" value="洗剪吹" />
          <el-option label="烫" value="烫" />
          <el-option label="染" value="染" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addForm = false">取消</el-button>
        <el-button type="primary" @click="upData">确定2</el-button>
      </span>
    </template>
  </el-dialog>



  <!-- 订单操作日志-->
  <el-dialog v-model="moneyTable" width="800px">
    <el-pagination v-model:current-page='mcurrentPage' background layout="prev, pager, next"
      :total="moneyList.length" />
    <el-table :data="computedmTableData" style="width: 100%">
      <el-table-column prop="reChargeID" label="充值ID" width="180" />
      <el-table-column prop="reChargeNum" label="充值编号" width="180" />
      <el-table-column prop="reChargeCard" label="充值卡号" />
      <el-table-column prop="reChargeDate" label="充值时间" />
      <el-table-column prop="reChargeMoney" label="充值金额" />
      <el-table-column prop="balance" label="本次充值后余额" />
    </el-table>
  </el-dialog>
</template>



<style lang='scss' scoped>
.input {
  display: flex;
  margin-top: 8px;
  flex-wrap: wrap;
  align-items: center;

  p {
    flex: 1;
    margin-right: 16px;
    display: flex;
    justify-content: start;
    white-space: nowrap;
    align-items: center;
    max-width: 300px;
  }
}

.el-input {
  width: 200px;
  height: 44px;
  border: 1px solid #CCCCCC;
  border-radius: 6px;

  p {
    width: 55px;
    height: 13px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #888888;
    line-height: 30px;
  }

}

.button {
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-right: 16px;
  margin-top:25px;
  .el-button {
    margin-bottom: 16px;
  }


}

.box-top {
  display: flex;
  justify-content: space-between;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
}

.el-pagination {
  margin-bottom: 16px;
}


.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}

.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}

.cell.current .text {
  background: #626aef;
  color: #fff;
}

.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--el-color-danger);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}

.demo-date-picker {
  margin-top: 16px;
}
</style>