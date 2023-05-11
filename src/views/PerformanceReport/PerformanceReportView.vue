<script setup>
import { Avatar } from "@element-plus/icons-vue";
import { ref, reactive,computed} from 'vue'
import Echarts from '@/components/Echarts.vue'
import { getService } from '@/api/service'
import { getreCharge } from '@/api/reCharge.js'

const rp = ref(0)
const rc = ref(0)

const consumption = reactive({
    tpro: 70,
    ypro: 35,
    twpro: 200,
    ywpro: 300,
    tmpro: 300,
    ympro: 1000,

})
const moneyList=ref([])
const tableData = ref([])
getService().then(res => {
    tableData.value = res
})
let mcurrentPage = ref(1)
let currentPage=ref(1)
const table = ref(false)
const retable = ref(false)
let computedmTableData = computed(() => {
  return moneyList.value.slice((mcurrentPage.value - 1) * 10, (mcurrentPage.value - 1) * 10 + 10)
})
let computedTableData = computed(() => {
  return moneyList.value.slice((currentPage.value - 1) * 10, (currentPage.value - 1) * 10 + 10)
})
//查看详情
function lookClick() {
  table.value = true
  getreCharge().then(res => {
    moneyList.value = res
  })
}
//充值办卡
function reClick() {
  retable.value = true
  getreCharge().then(res => {
    moneyList.value = res
  })
}
</script>
<template>
    <div class="contener">
        <div class="shop-performance">
            <p class="title">店铺业绩(单位:元)</p>
            <div class="data">
                <el-row :gutter="20">
                    <el-col :xs="8" :sm="6" :md="4" :lg="5" :xl="4">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>今日店铺业绩</p>
                                <p>0.00
                                </p>
                            </div>
                            <div>
                                <span style="color:red;">↑ 50%</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="3">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>昨日店铺业绩</p>
                                <p>0.00
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="3">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>本周店铺业绩</p>
                                <p>0.00
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="3">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>上周店铺业绩</p>
                                <p>0.00
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="4">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>本月店铺业绩</p>
                                <p>0.00
                                </p>
                            </div>
                            <div>
                                <span style="color:red;">↑ 50%</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="3">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>上月店铺业绩</p>
                                <p>0.00
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="3">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>自定义日期</p>

                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <span class="com">店铺收入=充值办卡+营收业绩</span>
            <div class="show">
                <div class="show-box">
                    <div>
                        <el-icon>
                            <Avatar />
                        </el-icon>
                        <p>营收业绩:{{ rp }}</p>
                    </div>
                    <el-button type="primary" @click="lookClick">查看详情</el-button>
                </div>
                <div class="show-box">
                    <div>
                        <el-icon>
                            <Avatar />
                        </el-icon>
                        <p>充值办卡:{{ rc }}</p>
                    </div>
                    <el-button type="primary" @click="reClick">充值办卡</el-button>
                </div>
                <div class="show-text">
                    <p>充值/销卡</p>
                    <div class="text">

                    </div>

                </div>
            </div>
        </div>
        <Echarts />
        <div class="shop-performance">
            <p class="title">服务项目</p>
            <div class="data">
                <el-row :gutter="20">
                    <el-col :xs="8" :sm="6" :md="4" :lg="5" :xl="4">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>今日消费项目</p>
                                <p>{{ consumption.tpro }}
                                </p>
                            </div>
                            <div>
                                <span style="color:red;">↑ 50%</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="3">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>昨日店铺业绩</p>
                                <p>{{ consumption.ypro }}
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="3">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>本周店铺业绩</p>
                                <p>{{ consumption.twpro }}
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="3">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>上周店铺业绩</p>
                                <p>{{ consumption.ywpro }}
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="4">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>本月店铺业绩</p>
                                <p>{{ consumption.tmpro }}
                                </p>
                            </div>
                            <div>
                                <span style="color:red;">↑ 50%</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="3">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>上月店铺业绩</p>
                                <p>{{ consumption.ympro }}
                                </p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="3" :lg="5" :xl="3">
                        <div class="data-box">
                            <div style="text-align: center;">
                                <p>自定义日期</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="pro" label="项目" width="550" />
                <el-table-column prop="num" label="消费次数" width="550" />
                <el-table-column prop="pri" label="消费金额" width="550" />
            </el-table>
        </div>
    </div>



      <!-- 查看 -->
  <el-dialog v-model="table" width="900px">
    <el-pagination v-model:current-page='mcurrentPage' background layout="prev, pager, next"
      :total="moneyList.length" />
    <el-table :data="computedmTableData" style="width: 100%">
      <el-table-column prop="reChargeID" label="项目名称" width="300" />
      <el-table-column prop="reChargeNum" label="项目个数" width="300" />
      <el-table-column prop="reChargeCard" label="支付方式及金额" width="300"/>
    </el-table>
  </el-dialog>

        <!-- 充卡 -->
        <el-dialog v-model="retable" width="1000px">
    <el-pagination v-model:current-page='mcurrentPage' background layout="prev, pager, next"
      :total="moneyList.length" />
    <el-table :data="computedTableData" style="width: 100%">
      <el-table-column prop="reChargeID" label="项目名称" width="200" />
      <el-table-column prop="reChargeNum" label="项目个数" width="200" />
      <el-table-column prop="reChargeCard" label="支付方式及金额" width="200"/>
      <el-table-column prop="reChargeNum" label="项目个数" width="200" />
      <el-table-column prop="reChargeCard" label="支付方式及金额" width="200"/>
    </el-table>
  </el-dialog>
</template>
<style lang="scss" scoped>
.contener {
    //width: 100%;
    position: relative;
    background-color: #f5f5f5;
}

.shop-performance {
    overflow: hidden;
    background-color: white;
    padding: 10px;


    .title {
        border-left: 6px solid;
        width: 142px;
        height: 15px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #666666;
        // line-height: 30px;
        padding-left: 8px;
    }
}

.el-row {
    margin-bottom: 20px;
    padding-left: 30px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
    background-color: #f5f5f5;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.data-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

}

.com {
    display: block;
    margin-left: 17px;
    margin-top: 36px;
    color: #CCC;
}

.show {
    height: 100px;
    margin-top: 39px;
    display: flex;
    justify-content: space-between;

    .show-box {
        width: 401px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #CCC;
        padding: 30px;

        div {
            display: flex;
            align-items: center;

            .el-icon {
                margin-right: 8px;
            }
        }
    }

    .show-text {
        width: 401px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px;

    }
}

.text {
    border: 1px solid #000;
    width: 300px;
    height: 83px;
}

.el-table {
    margin-top: 20px;
}
</style>