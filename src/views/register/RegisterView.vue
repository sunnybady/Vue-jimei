<script >
import { ElMessage } from 'element-plus'
import picture from "@/assets/picture.png";
import { mapState, mapMutations } from 'vuex'


export default {
    name: 'RegisterView',
    props: {
        msg: String,

    },
    data() {
        return {
            name: "",
            password: "",
            url: picture,
            yzm: "",
            verification: 'DG666',
            flag: false
        };
    }, methods: {
        login() {
            this.$router.push('/login')
        },
        handlefinish: function () {

            if (localStorage['name'] === this.name) {
                ElMessage({ message: "账号已存在", type: 'error' });
            }
            else if (this.name === '') {

                ElMessage({ message: "用户名不能为空", type: 'error' });
            } else if (this.password === '') {

                ElMessage({ message: "密码不能为空", type: 'error' });
            }
            else if (this.yzm === '') {
                ElMessage({ message: "验证码不能为空", type: 'error' });
            }
            else if (this.flag == false) {
                console.log(this.flag);
                ElMessage({ message: "勾选协议", type: 'error' });
            }
            else if (this.yzm === this.verification) {//将新用户信息存储到localStorage

                localStorage.setItem('name', this.name);
                localStorage.setItem('password', this.password);
                ElMessage({ message: "注册成功", type: 'success' });
                setTimeout(() => {
                    this.$router.replace('/Login');//完成注册后跳转至登录页面
                }, 1000)

            }
        },
        verification1() {

            ElMessage({ message: '您的验证码是:' + this.verification, type: 'success' })
            localStorage.setItem('verification', this.verification)
        }
    },

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
                <p class="header"> 用户注册 <b>已有账号，<span @click="login">直接登录</span></b></p>
                <el-input v-model="name" placeholder="请输入账号" />
                <!-- <label>用户名：</label><input type="text" v-model.trim="name"><br/> -->
                <el-input v-model="yzm" class="authCode" placeholder="请输入短信验证码" ref="yzm1" />
                <el-button type="primary" class="btn1" @click="verification1">发送验证码</el-button>
                <el-input v-model="password" class="psw" type="password" placeholder="请输入登录密码" show-password />
                <!-- <label>密码：</label><input type="password" v-model.trim="password"><br/> -->
                <el-button type="primary" class="btn2" @click="handlefinish">快速注册</el-button>
                <!-- <button @click.prevent="handlefinish">提交</button> -->
                <el-checkbox v-model="flag" @click="consent = !flag">同意我规定的协议</el-checkbox>

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
    display: flex;
    justify-content: space-between;
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
    padding: 0 80px;
    box-sizing: border-box;
}

.form-wrap .content b {
    font-weight: normal;
    text-align: right;
    display: inline-block;
    font-size: 12px;

}

.login-container .form-wrap .content .authCode {
    width: 70%;
}

.form-wrap .content span {
    color: rgb(44, 94, 220);
    cursor: pointer;
}

.form-wrap .content .el-input {
    width: 100%;
    margin-bottom: 20px;

}

.form-wrap .content .btn1 {
    margin-left: 2%;
    margin-bottom: 20px;
    width: 28%;


}

.form-wrap .content .btn2 {
    width: 100%;
}

a {
    text-decoration: none;
}

.form-wrap .content .title {
    text-align: center;

}
</style>
