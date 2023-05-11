<script setup>
import { ref, reactive, computed } from 'vue'
import { getManagerList, addManager, editManager, delManager, searchManager, rCharge } from '@/api/manager.js'
import { getreCharge, addreCharge } from '@/api/reCharge.js'
import { ElMessage } from 'element-plus'
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

//保存当前最后一个卡号
function saveLastCard() {
  getManagerList().then(res => {
    managerList.value = res
    lastCard.value = managerList.value[managerList.value.length - 1].managerCard + 1;
  }
  )

}

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
//添加会员
function open() {
  let date=new Date()
  cardDate.value=date.toLocaleDateString();
  addForm.value = true
  interfaceType.value = '10086'
  saveLastCard()
}
function close() {
  addForm.value = false;
  form.managerName = ''
  form.managerCard = ''
  form.password = ''
  form.cardDate = ''
  form.managerTell = ''
  form.balance = 0
  form.remarks = ''
  form.managerLv = ''
}
function add() {
  addManager(form
  ).then(res => {
    console.log(res);
    if (res.code == '200') {
      ElMessage.success(res.msg)
      addForm.value = false
      //重新获取列表
      getManagerList().then(res => {
        console.log(res);
        managerList.value = res
        //保存当前最后一个卡号
      }
      )
    } else {
      ElMessage.error('失败，失败')
    }

  })

}

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
  cardDate: cardDate,
  managerTell: '',
  balance: balance,
  remarks: '',
  managerLv: '',
  managerState: '激活'
})
//充值数据
const reChargeforms = reactive({
  reChargeNum: '10',
  reChargeCard: '',
  balance: '',
  reChargeDate: '2023/1/1',
  reChargeMoney: '',
  remarks: ''

})

//充值
function reCharge(row) {
  console.log(row);
  reChargeForm.value = true
  reChargeforms.balance = row.balance,
    reChargeforms.reChargeCard = row.managerCard


}

//充值数据
const reChargeData = reactive({
  reChargeID: '1000',
  reChargeNum: '10',
  balance: '1000',
  reChargeDate: '2023/1/1',
  reChargeMoney: '200',
  reChargeCard: '231321'

})
function upDaterecharge() {
  reChargeForm.value = false

  rCharge(reChargeforms).then(res => {
    console.log(res);
    addForm.value = false
    //重新获取列表
    getManagerList().then(res => {
      managerList.value = res


      addreCharge(reChargeData).then(res => {
        getreCharge().then(res => {
          moneyList.value = res
        })
      })
    }
    )
  })

}
const moneyTable = ref(false)
const moneyList = ref([])
//查看
function lookClick(row) {
  console.log(row);
  moneyTable.value = true
  getreCharge().then(res => {
    moneyList.value = res
  })
}

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
  form.managerName = ''
  form.managerCard = ''
  form.password = ''
  form.cardDate = ''
  form.managerTell = ''
  form.balance = '0'
  form.remarks = ''
  form.managerLv = ''


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
const searchData =ref({
  managerCard:'',
  managerName:'',
  date:'',
  managerTell:'',
  managerLv:''
})
function search() {
  searchManager(searchData).then(res => {
    //重新获取列表
    console.log(res);
    managerList.value = res

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
        <el-input v-model="searchData.managerCard" placeholder="请输入会员卡号" />
      </p>
      <p>会员姓名: <el-input v-model="searchData.managerName" placeholder="请输入会员姓名" /></p>

      <p class="demo-date-picker">
        <span>选择日期:</span>
        <el-date-picker v-model="searchData.date" type="date" placeholder="请选择日期" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
          size="large">
          <template #default="cell">
            <div class="cell" :class="{ current: cell.isCurrent }">
              <span class="text">{{ cell.text }}</span>
              <span v-if="isHoliday(cell)" class="holiday" />
            </div>
          </template>
        </el-date-picker>
      </p>


      <p>联系方式:<el-input v-model="searchData.managerTell" placeholder="请输入联系方式" /></p>
      <p>会员等级：
        <el-select v-model="searchData.managerLv" placeholder="请选择会员等级" size="large">
          <el-option label="钻石卡" value="钻石卡" />
          <el-option label="白金卡" value="白金卡" />
          <el-option label="金卡" value="金卡" />
        </el-select>
      </p>
    </div>

    <el-row class="button">
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="open">新增</el-button>
    </el-row>
  </div>




  <!-- 分页 -->

  <el-pagination v-model:current-page='currentPage' background layout="prev, pager, next" :total="managerList.length" />

  <el-table :data="computedTableData" style="width: 100%">
    <el-table-column prop="managerCard" label="会员卡号" width="140" />
    <el-table-column prop="password" label="密码" width="140" />
    <el-table-column prop="managerName" label="会员姓名" width="140" />
    <el-table-column prop="cardDate" label="办卡日期" width="140" />
    <el-table-column prop="managerTell" label="联系方式" width="140" />
    <el-table-column prop="balance" label="余额" width="200">
      <template #default="scope">
        <div style="display:flex;align-items: center;height: 25px;">
          <span style="padding-right: 20px;">{{ scope.row.balance }}</span>
          <el-button @click="reCharge(scope.row)" :text='true' link type="primary">充值</el-button>
          <el-button @click="lookClick(scope.row)" :text='true' link type="primary">查看</el-button>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="managerState" label="会员状态" />
    <el-table-column prop="managerLv" label="会员等级" />
    <el-table-column prop="remarks" label="备注" />
    <el-table-column prop="address" label="操作" width="160">
      <template #default="scope">
        <el-button @click="editClick(scope.row)" :text='true' link type="primary">修改</el-button>
        <el-button @click="delClick(scope.row)" :text='true' link type="primary">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 新增会员 -->
  <el-dialog v-model="addForm" :title="interfaceType == '10086' ? '新增会员' : '修改会员信息'" width="410px" @close="close">
    <el-form :model="form" >

      <!-- 会员卡号 -->
      <el-form-item label="会员卡号" :label-width="formLabelWidth">
        <el-input v-model="form.managerCard" autocomplete="off" disabled />
      </el-form-item>
      <!-- 会员密码 -->
      <el-form-item label="会员密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
      <!-- 会员名称 -->
      <el-form-item label="会员姓名" :label-width="formLabelWidth">
        <el-input v-model="form.managerName" autocomplete="off" />
      </el-form-item>
      <!-- 办卡日期 -->
      <el-form-item label="办卡日期" :label-width="formLabelWidth">
        <el-input v-model="form.cardDate" autocomplete="off" disabled />
      </el-form-item>
      <!-- 联系方式 -->
      <el-form-item label="联系方式" :label-width="formLabelWidth">
        <el-input v-model="form.managerTell" autocomplete="off" />
      </el-form-item>
      <!-- 余额 -->
      <el-form-item label="余额" :label-width="formLabelWidth">
        <el-input v-model="form.balance" autocomplete="off" disabled />
      </el-form-item>
      <!-- 会员等级 -->
      <el-form-item label="会员卡等级" :label-width="formLabelWidth">
        <el-select v-model="form.managerLv" placeholder="请选择会员等级">
          <el-option label="钻石卡" value="钻石卡" />
          <el-option label="白金卡" value="白金卡" />
          <el-option label="金卡" value="金卡" />
        </el-select>
      </el-form-item>
      <!-- 备注 -->
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.remarks" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button v-if="interfaceType == '10086'" type="primary" @click="add">确定1</el-button>
        <el-button v-else type="primary" @click="upData">确定2</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 充值 -->
  <el-dialog v-model="reChargeForm" title="会员充值" width="410px">
    <el-form :model="reChargeforms">
      <!-- 充值编号 -->
      <el-form-item label="充值编号" :label-width="formLabelWidth">
        <el-input v-model="reChargeforms.reChargeNum" autocomplete="off" />
      </el-form-item>
      <!-- 会员卡号 -->
      <el-form-item label="会员卡号" :label-width="formLabelWidth">
        <el-input v-model="reChargeforms.reChargeCard" autocomplete="off" />
      </el-form-item>
      <!-- 余额 -->
      <el-form-item label="余额" :label-width="formLabelWidth">
        <el-input v-model="reChargeforms.balance" autocomplete="off" disabled />
      </el-form-item>
      <!-- 充值时间-->
      <el-form-item label="充值时间" :label-width="formLabelWidth">
        <el-input v-model="reChargeforms.reChargeDate" autocomplete="off" disabled />
      </el-form-item>
      <!-- 充值金额-->
      <el-form-item label="充值金额" :label-width="formLabelWidth">
        <el-input v-model="reChargeforms.reChargeMoney" autocomplete="off" />
      </el-form-item>
      <!-- 充值说明 -->
      <el-form-item label="充值说明" :label-width="formLabelWidth">
        <el-input v-model="reChargeforms.remarks" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reChargeForm = false">取消</el-button>
        <el-button type="primary" @click="upDaterecharge">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 查看 -->
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
  width: 80px;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 25px;

  .el-button {
    margin-bottom: 16px;
  }

  .el-button {
    margin-bottom: 16px;
    margin-left: 0;
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

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>