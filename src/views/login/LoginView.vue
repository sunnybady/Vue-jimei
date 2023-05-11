<script>
import { ElMessage } from 'element-plus'
import picture from "@/assets/picture.png";
import { mapState, mapMutations } from 'vuex'

export default {

  data() {
    return {
      name: "",//姓名，用v-model绑定监听，将输入的字符串赋值给name变量
      password: "",//密码
      st: "false",//false为不保存登录
      url: picture,
      token: null
    };
  },
  methods: {
    //忘记密码跳转
    forget() {
      this.$router.push('/retrieve')
    },
    handlelogin: function () {
      if (this.name === localStorage['name'] && this.password === localStorage['password']) {
        this.$router.replace('/');//如果输入的名字以及密码正确路由跳转至个人页面
        localStorage.setItem('token','token')
      }
      else if (this.name === '') {
        ElMessage({ message: "用户名不能为空", type: 'error' });
      }
      else if (this.password === '') {
        ElMessage({ message: "密码不能为空", type: 'error' });
      }
      else if (this.password !== localStorage['name']) {
        ElMessage({ message: "账号错误", type: 'error' });
      }
      else if (this.password !== localStorage['password']) {
        ElMessage({ message: "密码错误", type: 'error' });
      }
     
    },
    handleregister: function () {
      this.$router.replace('/register')//点击注册按钮，跳转至注册页面
    },
    //点击保持登录状态触发handlesave
    handlesave: function () {
      this.st = "true";//修改登录状态为true
      localStorage.setItem('s', this.st);
      console.log(localStorage.s);
    }
  }
};
</script>



<template>
  <div class="login-container">
    <div class="log">
      <img :src="url" alt="">
    </div>
    <div class="form-wrap">
      <h2>集美造型会员管理系统</h2>
      <div class="content">
        <p class="header"> 用户登录 </p>
        <el-input name="username" v-model="name" placeholder="请输入账号" />
        <el-input name="password" v-model="password" class="psw" type="password" placeholder="请输入登录密码" show-password />
        <div class="wjPassword">
          <el-checkbox @click="handlesave" id="yes" type="radio" value="0">记住密码</el-checkbox>
          <!-- <input @click="handlesave" id="yes" type="radio" value="0">
            <label for="yes">保持登录状态</label> -->

          <span @click="forget">忘记密码</span>
        </div>

        <el-button type="primary" @click="handlelogin">立即登录</el-button>
        <p class="title">请输入验证码,<span @click="handleregister">注册新账号</span></p>

      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background: #323758;
}

.login-container .log {
  width: 448px;
  height: 407px;
  position: absolute;
  top: 25%;
  left: 15%;
}

.login-container .log img {
  width: 100%;
  height: 100%;
}

.form-wrap {

  position: absolute;
  top: 20%;
  right: 10%;

}

.form-wrap .header {
  margin: 0;
  height: 100px;
  line-height: 100px;
  text-align: center;

}

.form-wrap>h2 {

  width: 100%;
  height: 23px;
  text-align: center;
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #F7F7F7;
  line-height: 30px;
}



.form-wrap .content {
  width: 428px;
  height: 383px;
  background: #F7F7F7;
  border-radius: 6px;
  top: 190px;
  right: 130px;
  padding: 0 50px;
  box-sizing: border-box;
}

.form-wrap .content .wjPassword {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
}

.form-wrap .content span {
  color: rgb(44, 94, 220);
  cursor: pointer;
}

.form-wrap .content .el-input {
  width: 100%;
  margin-bottom: 20px;

}

.form-wrap .content .el-button {
  width: 100%;
}

a {
  text-decoration: none;
}

.form-wrap .content .title {
  text-align: center;
  font-size: 12px;
}
</style>
