<script setup>
import logo from "@/assets/jiedao.png";
import { ref,onMounted } from "vue";
import AsideCom from "@/components/AsideCom.vue";

import { Opportunity } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const url = ref(logo);
const router=useRouter()
onMounted(()=>{
  if(!localStorage.getItem('token')){
    router.push('/login')
  }
})
function logout() {
  console.log(router)
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="320px">
        <div class="logo-box">
          <el-image :src="url"></el-image>
          <h2 class="manage-title">集美造型会员管理系统</h2>
        </div>

        <AsideCom></AsideCom>
      </el-aside>

      <el-container>
        <el-header>
          <el-icon>
            <Opportunity />
          </el-icon>
          <span class="id">欢迎 吴店长 <button @click="logout">退出</button></span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="scss" scoped>
.el-container {
  background-color: #f5f5f5;

  .el-aside {
    background-color: #323758;

    .logo-box {
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      box-sizing: border-box;
      margin-bottom: 4px;

      .el-image {
        margin-right: 8px;
        width: 48px;
        height: 48px;
        
        border-radius: 50%;
      }

      .manage-title {
        width: 220px;
        height: 21px;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #F7F7F7;
        line-height: 30px;

      }
    }
  }
}

.el-header {
  background-color: #323758;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 64px;
}

.el-main {
  border: 8px solid #F5F5F5;
  box-sizing: border-box;
}
.id {
  color:#fff;
  margin-left: 16px;
}
</style>