<script lang="ts" setup>
import { ArrowDown, PieChart } from '@element-plus/icons-vue'
import { ElTag, ElDropdown, ElIcon, ElDropdownMenu, ElDropdownItem, ElTable, ElTableColumn } from 'element-plus';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import { getProList1, getProList2, deleteAdmin, deleteAdmin1, edit } from '../../api/order'
import { ElMessage } from 'element-plus'

const router = useRoute()
const table0: any = ref('')
const table1: any = ref('')
const table2: any = ref('')
const table3: any = ref('')
const shade: any = ref('')
const date1 = ref('')
const page = ref(0)
const radio = ref(3)
const Sales = ref('')
const condition = ref('')
const value1 = ref<[Date, Date]>([
    new Date(2016, 9, 10, 8, 40),
    new Date(2016, 9, 10, 9, 40),
])
const options1 = [
    {
        value: '洗剪吹',
        label: '洗剪吹',
    },
    {
        value: '做发型',
        label: '做发型',
    },
    {
        value: '染发',
        label: '染发',
    }
]
const options2 = [
    {
        value: '已预约',
        label: '已预约',
    },
    {
        value: '已到店',
        label: '已到店',
    },
    {
        value: '已完成',
        label: '已完成',
    },
    {
        value: '已取消',
        label: '已取消',
    }
]

let switch0 = ref(null)
let switch1 = ref(null)
let switch2 = ref(null)
let btn0 = ref(false)
let btn1 = ref(false)
let currentPage = ref(1)
let tableData = ref([])
let proList1 = ref([])
let proList2 = ref([])


function show0(row) {
    switch0 = row
    shade.value.style.display = 'block'
    table0.value.style.display = 'block';
}
function close0() {
    shade.value.style.display = 'none'
    table0.value.style.display = 'none';
    // console.log(btn1.value)
    btn0.value = false
}
function close0_1() {
    shade.value.style.display = 'none'
    table0.value.style.display = 'none';
    console.log(btn0.value)
    btn0.value = true
    if (btn0.value) {
        deleteClick0(switch0)
    }
}

function show1() {
    shade.value.style.display = 'block'
    table1.value.style.display = 'block';
}

function close1() {

    console.log(table1.value);
    shade.value.style.display = 'none'
    table1.value.style.display = 'none';
}
function show2(row) {
    switch1 = row
    shade.value.style.display = 'block'
    table2.value.style.display = 'block';

}

function close2() {
    table2.value.style.display = 'none';
    // console.log(btn1.value)
    btn1.value = false

}
function close2_1() {

table2.value.style.display = 'none';
console.log(btn1.value)
btn1.value = true
if (btn1.value) {
    deleteClick1(switch1)
}

}

function show3(id) {
    switch2 = id
    table3.value.style.display = 'block';

}
function close3() {
    editClick(switch2)
    table3.value.style.display = 'none';
    // console.log(btn1.value)
    btn1.value = false

}



getProList1({ page: page.value }).then(res => {
    proList1.value = res

    console.log(666, proList1.value);
})
getProList2({ page: page.value }).then(res => {
    proList2.value = res
    // console.log(111, res);

})

const computedTableData = computed(() => {
    return proList2.value.slice((currentPage.value - 1) * 10, (currentPage.value - 1) * 10 + 10)
})


function deleteClick0(row) {
    console.log(666, row);

    deleteAdmin({ id: row.id }).then(res => {
        if (res.code == 200) {
            getProList1().then(res => {
                proList1.value = res
            })
        } else {
            ElMessage.error('删除失败...')
        }
    })

}

function deleteClick1(row) {
    console.log(999, row);

    deleteAdmin1({ id: row.id }).then(res => {
        if (res.code == 200) {
            getProList2().then(res => {
                proList2.value = res
            })
        } else {
            ElMessage.error('删除失败...')
        }
    })
}

// 编辑的点击事件
function editClick(id) {

    edit({
       date:'',
       item:'',
       state:''

    }).then(res => {
        console.log(res);
        getProList2({ page: page.value }).then(res => {
            // console.log(res);
            proList2.value = res
        })
    })
}


</script>
<template>
    <div class="state">
        <div class="">
            <el-tag>待确定的预约单</el-tag>
            <el-tag class="ml-2" type="warning">已到店的预约订单</el-tag>
            <el-tag class="ml-2" type="success">也完成的预约单</el-tag>
            <el-tag class="ml-2" type="info">已取消的预约单</el-tag>
        </div>

        <div class="lis">
            <el-dropdown>
                <span class="el-dropdown-link">
                    预约展示：日期列表
                    <el-icon class="el-icon--right">
                        <arrow-down size="30" />
                    </el-icon>
                </span>

                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>员工列表</el-dropdown-item>
                        <el-dropdown-item>日期列表</el-dropdown-item>

                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-icon>
                <PieChart />
            </el-icon>
            <span class="span2" @click="show1">历史列表</span>
        </div>


        <div class="table1" ref="table1">
            <div class="title">
                <h3>预约历史记录</h3>
                <span @click="close1">X</span>
            </div>

            <!-- <el-pagination background  v-model:current-page="currentPage" layout="prev, pager, next" :total="1000" /> -->
            <div class="header">

                <el-pagination background v-model:current-page="currentPage" layout="prev, pager, next"
                    :total="proList2.length" />
                <el-dropdown>
                    <el-button type="primary">
                        全部<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>已预约</el-dropdown-item>
                            <el-dropdown-item>已到店</el-dropdown-item>
                            <el-dropdown-item>已完成</el-dropdown-item>
                            <el-dropdown-item>已取消</el-dropdown-item>

                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

            </div>

            <el-table :data="computedTableData" border style="width: 100%">
                <el-table-column prop="date" label="预约到店时间" width="160" />
                <el-table-column prop="name" label="顾客信息" width="160" />
                <el-table-column prop="item" label="预约项目" width="160" />
                <el-table-column prop="state" label="预约状态" width="160" />
                <el-table-column prop="payment" label="付款状态" width="160" />

                <el-table-column align="center" width="300">
                    <template #header class="btn">
                        操作
                    </template>
                    <template #default="scope">
                        <el-button size="small" type="success"
                            @click="$router.push('./ordermanagement')">去结账</el-button>
                        <el-button size="small" type="danger" @click="show2(scope.row)">取消</el-button>
                        <el-button type="primary" @click="show3(scope.row.id)">修改</el-button>

                    </template>
                </el-table-column>
            </el-table>

            <div class="table2" ref="table2">
                <div class="title">
                    <h3>请选择取消原因</h3>
                    <span @click="close2">X</span>
                </div>
                <el-radio-group v-model="radio">
                    <el-radio :label="3">客人原因-客人有事来不了</el-radio>
                    <el-radio :label="6">店铺原因-店铺人手不够，忙不过来</el-radio>

                </el-radio-group>
                <div class="btn">
                    <el-button @click="close2">取消</el-button>
                    <el-button type="primary" @click="close2_1">确定</el-button>
                </div>
            </div>

            <div class="table3" ref="table3">
                <div class="title">
                    <h3>修改预约信息</h3>
                    <span @click="close3">X</span>
                </div>
                <div class="block">
                    <span class="demonstration">预约到店时间:</span>
                    <el-date-picker v-model="date1" type="dates" placeholder="2022/10/13" style="width:150px" />
                    <el-time-picker v-model="value1" is-range range-separator="-" start-placeholder="8:30"
                        end-placeholder="9:00" style="width:155px" />
                </div>
                <div class="block">
                    顾客名称:<el-input disabled placeholder="小猪" style="width:365px" />
                </div>
                <div class="block">
                    预约项目:
                    <el-select v-model="Sales" class="m-2" placeholder="全部" style="width:365px">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div class="block">
                    预约状态:
                    <el-select v-model="condition" class="m-2" placeholder="全部" style="width:365px">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div class="block">
                    付款状态:
                    <el-input disabled placeholder="未付款" style="width:365px" />
                </div>
                <div class="block">
                    顾客联系方式:
                    <el-input style="width:365px" />
                </div>
                <div class="btn">
                    <el-button @click="close3">取消</el-button>
                    <div>
                        <el-button type="primary" @click="$router.push('./ordermanagement')">去结账</el-button>
                        <el-button type="primary" @click="close3">确定</el-button>
                    </div>

                </div>
            </div>
        </div>

    </div>
    <div class="data1">
        <el-table :data="proList1" border style="width: 100%">
            <el-table-column prop="date" label="Date" width="160" @click="" />
            <el-table-column prop="user" label="2022/10/20" width="160" />
            <el-table-column prop="user" label="2022/10/21" width="160" />
            <el-table-column prop="user" label="2022/10/22" width="160" />
            <el-table-column prop="user" label="2022/10/23" width="160" />
            <el-table-column prop="user" label="2022/10/24" width="160" />
            <el-table-column prop="user" label="2022/10/25" width="160" />
            <el-table-column prop="user" label="2022/10/26" width="160" />
            <el-table-column align="center">
                <template #header>
                    操作
                </template>
                <template #default="scope">
                    <el-button size="small" type="success" @click="$router.push('./ordermanagement')">去结账</el-button>
                    <el-button size="small" type="danger" @click="show0(scope.row)">取消</el-button>

                </template>
            </el-table-column>
        </el-table>

        <div class="table0" ref="table0">
            <div class="title">
                <h3>请选择取消原因</h3>
                <span @click="close0">X</span>
            </div>
            <el-radio-group v-model="radio">
                <el-radio :label="3">客人原因-客人有事来不了</el-radio>
                <el-radio :label="6">店铺原因-店铺人手不够，忙不过来</el-radio>

            </el-radio-group>
            <div class="btn">
                <el-button @click="close0">取消</el-button>
                <el-button type="primary" @click="close0_1">确定</el-button>
            </div>
        </div>
    </div>

    <div class="shade" ref="shade"></div>

</template>
<style lang="scss" scoped>
.state {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    position: relative;
}

.state .title {
    overflow: hidden;
}

.table1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    background-color: #fff;
    display: none;
    z-index: 999;
    padding: 10px;
    box-sizing: border-box;
    border: 5px solid #eee;
}

.table1>.table2,
.table1>.table3 {
    width: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 14px;

    transform: translate(-50%);
    background-color: rgb(244, 244, 246);
    display: none;
    z-index: 999;
    padding: 20px;
    box-sizing: border-box;
}

.table1>.table3 {
    width: 500px;
    top: 20%;
}

.table1>.table2>.btn,
.table1>.table3>.btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table1>.table2>.title,
.table1>.table3>.title {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
}


.table1>.table3 .block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}


.table1 .header {
    display: flex;
    justify-content: space-between;
}

.table1 .header .el-button {
    margin-right: 50px;
    background-color: #fff;
    border: 1px solid #000;
    color: #000;
}

.table1 h3 {
    float: left;
}

.table1 span {
    float: right;
    cursor: pointer;
}

.table1 .el-pagination {
    margin-bottom: 30px;
}

.el-dropdown-link {
    margin-right: 30px;
}

.state .lis {
    display: flex;
    justify-content: space-between;
}

.state .lis .span2 {

    cursor: pointer;
    color: #486DC5;

}

.demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-date-picker .block:last-child {
    border-right: none;
}

.demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}

.el-table .cell {
    display: flex;
}

.el-table .el-table-column>.btn {
    display: flex;
}

.data1 {
    position: relative;
}

.data1>.table0 {
    width: 280px;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 14px;

    transform: translate(-50%);
    background-color: rgb(244, 244, 246);
    display: none;
    z-index: 999;
    padding: 20px;
    box-sizing: border-box;
}

.data1>.table0>.btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.data1>.table0>.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.data1>.table0 span {
    cursor: pointer;
}

.shade {
    width: 100%;
    height: 100%;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    opacity: 0.2;
    display: none;
}
</style>
 