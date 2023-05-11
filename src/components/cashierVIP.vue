<script setup>
import { useStore } from "vuex";
import { Male, Female, Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import cashierAmend from '../components/cashierAmend.vue'
const store = useStore();





</script>
<template>
  <div class="vipBor">
    <p class="edit">
      <span>会员信息</span>
      <cashierAmend class="CA" @click="store.commit('CopyVip')" />
      <span class="iedit" @click="open"
        ><el-icon><Edit /></el-icon
      ></span>
    </p>
    <p>
      姓名：{{ store.state.vipMessage.vipName }}<el-icon><Male /></el-icon>
    </p>
    <P>手机号：{{ store.state.vipMessage.telephone }}</P>
    <p>会员卡号：{{ store.state.vipMessage.cardnum }}</p>
    <p>生日：{{ store.state.vipMessage.birthday }}</p>
    <p>备注：无</p>
    <el-button
      type="primary"
      class="removeVip"
      @click="store.commit('remVIP', store.state.vipMessage.id)"
      >删除会员</el-button
    >
    <el-button type="primary">设置消费密码</el-button>
  </div>
</template>
<style lang="scss" scoped>
.vipBor {
  width: 400px;
  height: 300px;
  background-color: rgb(240, 240, 240);
  overflow: hidden;
}
p {
  text-align: center;
}
.removeVip {
  margin-left: 100px;
}
.iedit {
  //   display: flex;
  //   justify-content: space-around;
  float: right;
  margin-right: 20px;
}
.CA{
  float:right;
}
</style>