<script setup >
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import { Male, Female } from "@element-plus/icons-vue";
const store = useStore();
const drawer = ref(false);

const direction = ref("rtl");

function cancelClick() {
  drawer.value = false;
}
const radio1 = ref(store.state.copVIPmes.sex);

// radio1.value=store.state.copVIPmes.sex

const copyTel = ref('')
const paypss=ref('')
const value2 = ref('');
</script>
<template>
  <span class="draw">
    <el-button text @click="drawer = true"> 修改 </el-button>
    <el-drawer
      v-model="drawer"
      title="会员信息"
      :direction="direction"
      :before-close="handleClose"
    >
      <!-- 姓名 -->
      <div>
        <span>姓名：</span>
        <el-input
          class="nameInp"
          v-model="store.state.copVIPmes.vipName"
          placeholder="请输入要修改的名字"
        />
      </div>
      <!-- 性别 -->
      <div class="sex">
        <span class="sextext">性别</span>
        <!-- {{ store.state.copVIPmes.sex }} -->
        <el-radio-group v-model="radio1" >
          <el-radio label="男" size="large"
            ><el-icon size="30"><Female /></el-icon
          ></el-radio>
          <el-radio label="女" size="large"
            ><el-icon size="30"><Male /></el-icon
          ></el-radio>
        </el-radio-group>
      </div>
      <!-- 手机号码 -->
    <div class="tele">
        <span>修改手机号码</span>
        <el-input  class="telInp" v-model="copyTel" placeholder="请输入新的手机号码" />
    </div>
    <!-- 支付密码 -->
    <div>
        <span>修改支付密码</span>
       <el-input class="paypassInp" v-model="paypass" placeholder="请输入新的支付密码"  /> 

    </div>
    <!-- 选择生日 -->
    <div>
        <!-- <span>选择生日</span> -->
         <div class="demo-date-picker">
      <div class="block">
        <span class="demonstration">选择生日</span>
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="选择日期"
          :size="size"
       format="YYYY-MM-DD"
       value-format="YYYY/MM/DD"
        />
      </div>
    </div>
    </div>
    <!-- 底部 -->
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确认</el-button>
        </div>
      </template>
    </el-drawer>
    
  </span>
</template>
<style lang="scss" scoped>
.nameInp {
  width: 300px;
}
.el-drawer{
    display: flex;
    align-content:space-around
}

.sex {
    
  display: flex;
  justify-content:center;
}
.sextext {
  height: 40px;
  line-height: 40px;
}
.telInp{
    width: 300px;
}
.paypassInp{
width: 300px;
}
</style>