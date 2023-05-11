<script setup>
import { useRouter, useRoute } from 'vue-router'
import { Avatar } from "@element-plus/icons-vue";
const router = useRouter()
const route = useRoute()



</script>

<template>
  <el-menu default-active="route.path" router>
    <!-- <el-submenu index="">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item index="">导航1-1</el-menu-item>
        </el-submenu> -->


        <el-menu-item index="/BillingCashier">
          <el-icon>
        <Avatar />
      </el-icon>
      <span slot="title">开单收银</span>
    </el-menu-item>

    <el-menu-item index="/manager">
      <el-icon>
        <Avatar />
      </el-icon>
      <span slot="title">会员管理</span>
    </el-menu-item>

    <el-menu-item index="/order">
      <el-icon>
        <Avatar />
      </el-icon>
      <span slot="title">店铺预约</span>
    </el-menu-item>


    <el-menu-item index="/report">
      <el-icon>
        <Avatar />
      </el-icon>
      <span slot="title">业绩报表</span>
    </el-menu-item>



    <el-menu-item index="/project">
      <el-icon>
        <Avatar />
      </el-icon>
      <span slot="title">项目管理</span>
    </el-menu-item>





    <el-menu-item index="/employee">
      <el-icon>
        <Avatar />
      </el-icon>
      <span slot="title">员工管理</span>
    </el-menu-item>
   
    <el-menu-item index="/ordermanagement">
      <el-icon>
        <Avatar />
      </el-icon>
      <span slot="title">订单管理</span>
    </el-menu-item>
   
    <el-menu-item index="/system">
      <el-icon>
        <Avatar />
      </el-icon>
      <span slot="title">系统设置</span>
    </el-menu-item>
   

  </el-menu>




</template>
  
 