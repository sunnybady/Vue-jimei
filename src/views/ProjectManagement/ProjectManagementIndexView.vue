<script setup>
import {ref,reactive,computed} from 'vue'
import {getProjectList,addProject,editProject,delProject,searchProject} from '@/api/project'

let proPrice =ref('')
let projectList=ref([])
let project=ref('')
let proName =ref('')
let currentPage=ref(1)
let proCard=ref('')
let interfaceType=ref('10086')

let lastCard =ref('')
const formLabelWidth = '100px'

//消息框是否弹出
const addForm =ref(false)


getProjectList().then(res=>{
    console.log(res);
    projectList.value=res
})

//分页
let computedTableData=computed(()=>{
    return projectList.value.slice((currentPage.value-1)*10,(currentPage.value-1)*10+10)
})

//项目数据
const form = reactive({
  proCard:lastCard,
  proName:'',
  proPrice:'',
  remarks:''
})

//查询
function search(){
    searchProject({
        proPrice:proPrice.value,
        proName:project.value
    }).then(res=>{
    projectList.value=res.newdata
    })
}


//保存当前最后一个卡号
function saveLastCard(){
    getProjectList().then(res=>{
    projectList.value=res
    lastCard.value=projectList.value[projectList.value.length-1].proCard+1;
}
)
    
}

//添加项目
function open(){
    addForm.value=true
    saveLastCard()
}

function add(){
    addProject(form).then(res=>{
        console.log(res);
        if(res.code=='200'){
            ElMessage.success(res.msg)
            addForm.value=false
            getProjectList().then(res=>{
                projectList.value=res
            })
        }
    
    })
}

//修改项目
function editClick(row){
    interfaceType.value='10010'
    //打开消息框
    addForm.value=true
    console.log(row);
    form.proCard=row.proCard,
    form.proName=row.proName,
    form.proPrice=row.proPrice,
    form.remarks=row.remarks

}

function upData(){
    editProject(form).then(res=>{
        addForm.value= false
        //重新获取列表
        getProjectList().then(res=>{
    projectList.value=res

}
)
    })
}
//删除项目
function delClick(row){
    console.log(row);
    delProject({
        proCard:row.proCard
    }).then(res=>{
        console.log(res);
        getProjectList().then(res=>{
    projectList.value=res
    //保存当前最后一个卡号
}
)
        
    })
}
  </script>
  

<template>
    <div class="box-top">
    <div class="input">
        <p>项目价格:
        <el-input v-model="proPrice" placeholder="请输入项目价格" /></p>
        <p>项目名称:  
            <el-select v-model="project" placeholder="请请输入项目名称" size="large">
          <el-option label="洗剪吹" value="洗剪吹" />
          <el-option label="烫" value="烫" />
          <el-option label="染" value="染" />
        </el-select>
</p></div>


       <div class="button">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="open">新增</el-button>
  
       </div>
    </div>
    <!-- 分页 -->

    <el-pagination v-model:current-page='currentPage' background layout="prev, pager, next" :total="projectList.length" />

  <el-table :data="computedTableData"  style="width: 100%">
    <el-table-column prop="proCard" label="项目编号" width="180" />
    <el-table-column prop="proName" label="项目名称" width="180" />
    <el-table-column prop="proPrice" label="项目价格" />
    <el-table-column prop="remarks" label="备注" ></el-table-column>
    <el-table-column prop="address" label="操作" >
        <template #default="scope">
        <el-button @click="editClick(scope.row)" type="primary" size="small">修改</el-button>
    <el-button type="success" size="small" @click="delClick(scope.row)">删除</el-button>
</template>
    </el-table-column>
  </el-table>


   <!-- 新增项目/修改项目 -->
   <el-dialog v-model="addForm" :title="interfaceType == '10086' ? '新增项目' : '修改项目'" width="400px">
    <el-form :model="form">
      
        <!-- 项目编号 -->
        <el-form-item label="项目编号" :label-width="formLabelWidth">
        <el-input v-model="form.proCard" autocomplete="off"  disabled/>
      </el-form-item>
      <!-- 项目名称 -->
      <el-form-item label="项目名称" :label-width="formLabelWidth">
        <el-input v-model="form.proName" autocomplete="off"  v-if="interfaceType == '10086'" />
        <el-input v-model="form.proName" autocomplete="off"  disabled v-else/>
      </el-form-item>
          <!-- 项目价格 -->
      <el-form-item label="项目价格" :label-width="formLabelWidth">
        <el-input v-model="form.proPrice" autocomplete="off" />
      </el-form-item>

       <!-- 备注 -->
       <el-form-item label="备注说明" :label-width="formLabelWidth">
        <el-input v-model="form.remarks" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addForm = false">取消</el-button>
        <el-button v-if="interfaceType == '10086'" type="primary" @click="add">确定1</el-button>
        <el-button v-else type="primary" @click="upData">确定2</el-button>
      </span>
    </template>
  </el-dialog>
  
</template>
<style lang='scss' scoped>
.input {
    display: flex;
    margin-top: 8px;
    p{
        margin-right: 60px;
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
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    .el-button{
        margin-bottom: 16px;
        margin-left: 0;
    }


}
.box-top {
    display: flex;
    justify-content: space-between;
}
.el-pagination {
  margin-bottom: 16px;
}


</style>