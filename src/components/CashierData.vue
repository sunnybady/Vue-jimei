<script setup >
import { ref } from "vue";
const value1 = ref("");
import { useStore } from 'vuex'
const store=useStore()
</script>
<template>
  
  <div class="bor">
    <div class="demo-date-picker">
      <div class="block">
        <span class="demonstration">修改订单日期</span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          :size="size"
       format="YYYY-MM-DD"
       value-format="YYYY/MM/DD"
        />
      </div>
    </div>
    <el-button class="cancel" @click="store.commit('showDate')">取消</el-button>
    <el-button type="primary" @click="store.commit('getDate',value1)" >确定</el-button>
  </div>
</template>
<style lang="scss" scoped>
.bor {
  border: 1px solid;
  width: 250px;
  height: 200px;
  background-color: #fff;
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
.cancel{
    margin-left: 50px;
}
</style>