<script setup >
import { useStore } from "vuex";

// import { isDark } from '~/composables/dark'

const store = useStore();
import {ref} from 'vue'
const value = ref('')
let input=ref()
const options = [
  {
    value: '会员卡',
    label: '会员卡',
  },
  {
    value: '支付宝',
    label: '支付宝',
  },
  {
    value: '微信',
    label: '微信',
  },

]
</script>
<template>
  <div class="bor">
    <div>
      <p>项目名称</p>
      <el-button @click="store.commit('getPro', ['洗剪吹', '30'])">
        <ul>
          <li>洗剪吹001</li>
          <li class="price">30¥</li>
        </ul>
      </el-button>
      <el-button @click="store.commit('getPro', ['烫', '200'])">
        <ul>
          <li>烫002</li>
          <li class="price">200¥</li>
        </ul>
      </el-button>

      <el-button @click="store.commit('getPro', ['染', '250'])">
        <ul>
          <li>染003</li>
          <li class="price">250¥</li>
        </ul>
      </el-button>
    </div>

    <!-- 数量设置 -->
    <div>
      <p>数量设置</p>
      <el-input v-model="input" placeholder="请输入数量" clearable size="large" @input="store.state.myTD.inpFlag=true"/>
    </div>
    <!-- 支付方式 -->
    <div>
      <p>支付方式</p>
      <el-select v-model="value" class="m-2" placeholder="请选择支付方式" size="large" @change="store.state.myTD.selFlag=true">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <!-- 确认 -->
    <div>
        <el-button color="#626aef" :disabled="store.getters.butFlag" type="primary" round class="que" @click="store.commit('subPro',[input,value])">确认</el-button>
       
    </div>
  </div>
</template>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  padding: 0;
}
.bor {
  width: 750px;
  height: 200px;
  border: 1px solid;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  display: flex;
  justify-content: space-around;
  flex-wrap:wrap;
}

.el-button {
  width: 70px;
  height: 60px;
  line-height: 25px;
  background-color: rgb(226, 224, 224);
}
.price {
  color: rgb(255, 174, 0);
}
.que{
    width: 100px;
    height: 40px;
}
</style>