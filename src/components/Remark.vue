<script setup>
import { ref } from "vue";
let bzMeg = ref("");
import { useStore}from 'vuex'
const store=useStore()
</script>
<template>
  <div class="bor">
      <div>
          <span class="bzxx">备注信息</span>
          <span class="X"  @click="store.state.remarkFlag=false">X</span>
      </div>
    
    <el-form :model="form" >
    <el-form-item class="bz">
      <el-input v-model="bzMeg" placeholder="请输入备注信息，最多两百字"/>
    </el-form-item>
    </el-form>

    <el-button class="quxiao" size="large" @click="store.state.remarkFlag=false">取消</el-button>
    <el-button type="primary" size="large">确认</el-button>
  </div>
</template>
<style lang="scss" scoped>
*{
    margin: 0px;
    padding: 0px;
}
.bor {
  width: 400px;
  height: 250px;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  box-sizing: border-box;
}
.bzxx{
//   text-align: center;
  font-size: 20px;
}
.X{
    font-size: 20px;
    float:right
}
.el-form-item__content{
    margin-left:0;
}
.bz {
  width: 360px;
  height: 100px;
}
.el-input__inner {
  width: 360px;
  height: 100px;
}
.quxiao{
    margin-left: 100px;
    margin-right: 30px;
}
</style>